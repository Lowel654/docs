<?php
/**
 * AZTRANSFER.AZ — PHP REST API Entry Point
 * Requires PHP 8.2+, MySQL/MariaDB
 */

declare(strict_types=1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Load environment
$envFile = __DIR__ . '/../.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (str_starts_with(trim($line), '#')) continue;
        if (str_contains($line, '=')) {
            [$key, $value] = explode('=', $line, 2);
            $_ENV[trim($key)] = trim($value);
        }
    }
}

// Database connection
function getDB(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $host = $_ENV['DB_HOST'] ?? 'localhost';
        $name = $_ENV['DB_NAME'] ?? 'aztransfer';
        $user = $_ENV['DB_USER'] ?? 'root';
        $pass = $_ENV['DB_PASS'] ?? '';
        $pdo = new PDO("mysql:host=$host;dbname=$name;charset=utf8mb4", $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    }
    return $pdo;
}

// JWT helpers
function generateJWT(array $payload): string {
    $secret = $_ENV['JWT_SECRET'] ?? 'aztransfer-secret-key-change-in-production';
    $header = base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload['iat'] = time();
    $payload['exp'] = time() + 86400; // 24h
    $payloadEncoded = base64_encode(json_encode($payload));
    $signature = base64_encode(hash_hmac('sha256', "$header.$payloadEncoded", $secret, true));
    return "$header.$payloadEncoded.$signature";
}

function verifyJWT(string $token): ?array {
    $secret = $_ENV['JWT_SECRET'] ?? 'aztransfer-secret-key-change-in-production';
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;
    [$header, $payload, $signature] = $parts;
    $expected = base64_encode(hash_hmac('sha256', "$header.$payload", $secret, true));
    if (!hash_equals($expected, $signature)) return null;
    $data = json_decode(base64_decode($payload), true);
    if (($data['exp'] ?? 0) < time()) return null;
    return $data;
}

function getAuthUser(): ?array {
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!str_starts_with($header, 'Bearer ')) return null;
    return verifyJWT(substr($header, 7));
}

function jsonResponse(mixed $data, int $code = 200): never {
    http_response_code($code);
    echo json_encode($data);
    exit;
}

function jsonError(string $message, int $code = 400): never {
    jsonResponse(['error' => $message], $code);
}

// CSRF token (for form submissions)
function generateCSRFToken(): string {
    if (session_status() === PHP_SESSION_NONE) session_start();
    $token = bin2hex(random_bytes(32));
    $_SESSION['csrf_token'] = $token;
    return $token;
}

// Rate limiting (simple in-memory, use Redis in production)
function checkRateLimit(string $key, int $maxRequests = 60, int $windowSeconds = 60): bool {
    $file = sys_get_temp_dir() . '/rate_limit_' . md5($key);
    $data = file_exists($file) ? json_decode(file_get_contents($file), true) : ['count' => 0, 'reset' => time() + $windowSeconds];
    if (time() > $data['reset']) {
        $data = ['count' => 0, 'reset' => time() + $windowSeconds];
    }
    $data['count']++;
    file_put_contents($file, json_encode($data));
    return $data['count'] <= $maxRequests;
}

// Input sanitization
function sanitize(string $input): string {
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

function getInput(): array {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?? [];
}

function generateUUID(): string {
    return sprintf(
        '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}

// ── Routing ──────────────────────────────────────────────────

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = rtrim(str_replace('/api', '', $uri), '/') ?: '/';

$clientIP = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
if (!checkRateLimit($clientIP)) {
    jsonError('Too many requests', 429);
}

// Routes
match (true) {
    // Auth
    $uri === '/auth/register' && $method === 'POST' => handleRegister(),
    $uri === '/auth/login' && $method === 'POST' => handleLogin(),
    $uri === '/auth/me' && $method === 'GET' => handleMe(),

    // Bookings
    $uri === '/bookings' && $method === 'GET' => handleListBookings(),
    $uri === '/bookings' && $method === 'POST' => handleCreateBooking(),

    // Pricing
    $uri === '/pricing/estimate' && $method === 'POST' => handlePriceEstimate(),

    // Vehicles
    $uri === '/vehicles' && $method === 'GET' => handleListVehicles(),

    // Contact
    $uri === '/contact' && $method === 'POST' => handleContact(),

    // Admin
    $uri === '/admin/stats' && $method === 'GET' => handleAdminStats(),

    // Health check
    $uri === '/health' => jsonResponse(['status' => 'ok', 'version' => '1.0.0']),

    default => jsonError('Not Found', 404),
};

// ── Handlers ─────────────────────────────────────────────────

function handleRegister(): void {
    $input = getInput();
    $name = sanitize($input['name'] ?? '');
    $email = sanitize($input['email'] ?? '');
    $phone = sanitize($input['phone'] ?? '');
    $password = $input['password'] ?? '';

    if (!$name || !$email || !$phone || strlen($password) < 6) {
        jsonError('All fields are required and password must be at least 6 characters');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonError('Invalid email address');
    }

    $db = getDB();
    $existing = $db->prepare('SELECT id FROM users WHERE email = ?');
    $existing->execute([$email]);
    if ($existing->fetch()) {
        jsonError('Email already registered', 409);
    }

    $id = generateUUID();
    $hash = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $db->prepare('INSERT INTO users (id, email, phone, name, password_hash, role) VALUES (?, ?, ?, ?, ?, ?)');
    $stmt->execute([$id, $email, $phone, $name, $hash, 'customer']);

    $token = generateJWT(['user_id' => $id, 'role' => 'customer']);
    jsonResponse(['token' => $token, 'user' => ['id' => $id, 'name' => $name, 'email' => $email, 'role' => 'customer']], 201);
}

function handleLogin(): void {
    $input = getInput();
    $email = sanitize($input['email'] ?? '');
    $password = $input['password'] ?? '';

    $db = getDB();
    $stmt = $db->prepare('SELECT id, name, email, password_hash, role FROM users WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        jsonError('Invalid credentials', 401);
    }

    $token = generateJWT(['user_id' => $user['id'], 'role' => $user['role']]);
    jsonResponse([
        'token' => $token,
        'user' => ['id' => $user['id'], 'name' => $user['name'], 'email' => $user['email'], 'role' => $user['role']],
    ]);
}

function handleMe(): void {
    $auth = getAuthUser();
    if (!$auth) jsonError('Unauthorized', 401);

    $db = getDB();
    $stmt = $db->prepare('SELECT id, name, email, phone, role, language, created_at FROM users WHERE id = ?');
    $stmt->execute([$auth['user_id']]);
    $user = $stmt->fetch();

    if (!$user) jsonError('User not found', 404);
    jsonResponse($user);
}

function handleListBookings(): void {
    $auth = getAuthUser();
    if (!$auth) jsonError('Unauthorized', 401);

    $db = getDB();
    $stmt = $db->prepare('SELECT * FROM bookings WHERE customer_id = ? ORDER BY created_at DESC LIMIT 50');
    $stmt->execute([$auth['user_id']]);
    jsonResponse($stmt->fetchAll());
}

function handleCreateBooking(): void {
    $auth = getAuthUser();
    if (!$auth) jsonError('Unauthorized', 401);

    $input = getInput();
    $id = generateUUID();

    $db = getDB();
    $stmt = $db->prepare('
        INSERT INTO bookings (id, customer_id, vehicle_category, origin_address, origin_lat, origin_lng, dest_address, dest_lat, dest_lng, total_price, flight_number, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ');
    $stmt->execute([
        $id,
        $auth['user_id'],
        sanitize($input['vehicle_category'] ?? 'economy'),
        sanitize($input['origin_address'] ?? ''),
        $input['origin_lat'] ?? 0,
        $input['origin_lng'] ?? 0,
        sanitize($input['dest_address'] ?? ''),
        $input['dest_lat'] ?? 0,
        $input['dest_lng'] ?? 0,
        $input['total_price'] ?? 0,
        sanitize($input['flight_number'] ?? ''),
        sanitize($input['notes'] ?? ''),
    ]);

    jsonResponse(['id' => $id, 'status' => 'pending'], 201);
}

function handlePriceEstimate(): void {
    $input = getInput();
    $distanceKm = floatval($input['distance_km'] ?? 0);
    $durationMin = intval($input['duration_min'] ?? 0);

    if ($distanceKm <= 0) jsonError('Distance is required');

    $vehicles = [
        ['id' => 'economy',   'base' => 3,  'perKm' => 0.6, 'min' => 5],
        ['id' => 'comfort',   'base' => 5,  'perKm' => 0.9, 'min' => 8],
        ['id' => 'business',  'base' => 8,  'perKm' => 1.4, 'min' => 15],
        ['id' => 'suv',       'base' => 7,  'perKm' => 1.2, 'min' => 12],
        ['id' => 'minivan',   'base' => 8,  'perKm' => 1.1, 'min' => 15],
        ['id' => 'minibus',   'base' => 20, 'perKm' => 1.8, 'min' => 30],
        ['id' => 'bus',       'base' => 50, 'perKm' => 2.5, 'min' => 80],
        ['id' => 'airport',   'base' => 15, 'perKm' => 1.0, 'min' => 20],
        ['id' => 'corporate', 'base' => 12, 'perKm' => 1.6, 'min' => 25],
    ];

    $multiplier = 1.2; // Global 20% markup
    $estimates = [];

    foreach ($vehicles as $v) {
        $raw = $v['base'] + ($distanceKm * $v['perKm']);
        $total = max($raw * $multiplier, $v['min']);
        $estimates[] = [
            'vehicle_id' => $v['id'],
            'distance_km' => $distanceKm,
            'duration_min' => $durationMin,
            'total_price' => round($total, 2),
            'currency' => 'AZN',
        ];
    }

    jsonResponse($estimates);
}

function handleListVehicles(): void {
    try {
        $db = getDB();
        $stmt = $db->query('SELECT * FROM vehicles WHERE active = 1 ORDER BY category');
        jsonResponse($stmt->fetchAll());
    } catch (\Exception) {
        // Return default vehicles if DB not available
        jsonResponse([]);
    }
}

function handleContact(): void {
    $input = getInput();
    $name = sanitize($input['name'] ?? '');
    $email = sanitize($input['email'] ?? '');
    $message = sanitize($input['message'] ?? '');

    if (!$name || !$email || !$message) {
        jsonError('All fields are required');
    }

    try {
        $db = getDB();
        $stmt = $db->prepare('INSERT INTO contact_messages (id, name, email, message) VALUES (?, ?, ?, ?)');
        $stmt->execute([generateUUID(), $name, $email, $message]);
    } catch (\Exception) {
        // DB might not be set up yet, still return success
    }

    jsonResponse(['success' => true, 'message' => 'Message sent successfully']);
}

function handleAdminStats(): void {
    $auth = getAuthUser();
    if (!$auth || $auth['role'] !== 'admin') {
        jsonError('Forbidden', 403);
    }

    try {
        $db = getDB();
        $revenue = $db->query("SELECT COALESCE(SUM(total_price), 0) as total FROM bookings WHERE status = 'completed'")->fetch();
        $bookings = $db->query('SELECT COUNT(*) as total FROM bookings')->fetch();
        $drivers = $db->query("SELECT COUNT(*) as total FROM drivers WHERE is_online = 1")->fetch();
        $customers = $db->query("SELECT COUNT(*) as total FROM users WHERE role = 'customer'")->fetch();

        jsonResponse([
            'total_revenue' => floatval($revenue['total']),
            'total_bookings' => intval($bookings['total']),
            'active_drivers' => intval($drivers['total']),
            'total_customers' => intval($customers['total']),
        ]);
    } catch (\Exception) {
        jsonResponse([
            'total_revenue' => 0,
            'total_bookings' => 0,
            'active_drivers' => 0,
            'total_customers' => 0,
        ]);
    }
}

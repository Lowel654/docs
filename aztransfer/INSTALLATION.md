# AZTRANSFER.AZ — Installation Guide

## Prerequisites

- Node.js 18+ (for building the frontend)
- PHP 8.2+ (for the API backend)
- MySQL 8.0+ or MariaDB 10.6+
- cPanel hosting with PHP support

## Quick Start (Development)

```bash
# Clone the repository
git clone https://github.com/Lowel654/docs.git
cd docs/aztransfer

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Add your Google Maps API key to .env.local
# NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the app.

## cPanel Deployment

### Step 1: Build the Frontend

```bash
cd aztransfer
npm install
npm run build
```

This creates the production build in the `.next` directory.

### Step 2: Upload Files

1. Upload the entire `aztransfer` folder contents to `public_html/`
2. Make sure the `api/` folder is at `public_html/api/`
3. Upload `.htaccess` to `public_html/`
4. Upload `api/.htaccess` to `public_html/api/`

### Step 3: Import Database

1. Open **phpMyAdmin** in cPanel
2. Create a new database named `aztransfer`
3. Create a database user and grant all privileges
4. Import `database/schema.sql`

### Step 4: Configure Environment

1. Copy `.env.example` to `.env` in `public_html/`
2. Update database credentials:
   ```
   DB_HOST=localhost
   DB_NAME=aztransfer
   DB_USER=your_db_user
   DB_PASS=your_db_password
   ```
3. Set your JWT secret (generate a random string)
4. Add your Google Maps API key

### Step 5: Verify

1. Visit `https://aztransfer.az` — homepage with Google Maps should load
2. Visit `https://aztransfer.az/api/health` — should return `{"status":"ok"}`
3. Test registration and login
4. Test booking flow

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login (returns JWT) |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/bookings` | List user bookings |
| POST | `/api/bookings` | Create booking |
| POST | `/api/pricing/estimate` | Get price estimates |
| GET | `/api/vehicles` | List vehicles |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/admin/stats` | Admin dashboard stats |
| GET | `/api/health` | Health check |

## Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable these APIs:
   - Maps JavaScript API
   - Places API
   - Directions API
   - Distance Matrix API
   - Geocoding API
4. Create an API key and restrict it to your domain

## SSL Configuration

The `.htaccess` file includes automatic HTTPS redirect. Make sure SSL is enabled in cPanel:
1. Go to **SSL/TLS** in cPanel
2. Use **AutoSSL** or install a Let's Encrypt certificate

## Support

- Email: info@aztransfer.az
- Phone: +994 55 853 50 55
- WhatsApp: +994 55 853 50 55

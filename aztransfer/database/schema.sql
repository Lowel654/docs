-- ============================================================
-- AZTRANSFER.AZ — MySQL Database Schema
-- ============================================================

CREATE DATABASE IF NOT EXISTS `aztransfer` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `aztransfer`;

-- ── Users ────────────────────────────────────────────────────

CREATE TABLE `users` (
  `id` CHAR(36) NOT NULL PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `phone` VARCHAR(20) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('customer','driver','dispatcher','admin') NOT NULL DEFAULT 'customer',
  `avatar` VARCHAR(500) DEFAULT NULL,
  `language` ENUM('az','en','ru','tr','ar') NOT NULL DEFAULT 'en',
  `email_verified` TINYINT(1) NOT NULL DEFAULT 0,
  `phone_verified` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_users_role` (`role`),
  INDEX `idx_users_email` (`email`)
) ENGINE=InnoDB;

-- ── Drivers ──────────────────────────────────────────────────

CREATE TABLE `drivers` (
  `user_id` CHAR(36) NOT NULL PRIMARY KEY,
  `is_online` TINYINT(1) NOT NULL DEFAULT 0,
  `current_lat` DECIMAL(10,7) DEFAULT NULL,
  `current_lng` DECIMAL(10,7) DEFAULT NULL,
  `vehicle_id` CHAR(36) DEFAULT NULL,
  `rating` DECIMAL(3,2) NOT NULL DEFAULT 5.00,
  `total_trips` INT NOT NULL DEFAULT 0,
  `license_number` VARCHAR(50) DEFAULT NULL,
  `license_expiry` DATE DEFAULT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── Driver Documents ─────────────────────────────────────────

CREATE TABLE `driver_documents` (
  `id` CHAR(36) NOT NULL PRIMARY KEY,
  `driver_id` CHAR(36) NOT NULL,
  `type` ENUM('license','registration','insurance','id') NOT NULL,
  `file_url` VARCHAR(500) NOT NULL,
  `expires_at` DATE DEFAULT NULL,
  `verified` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`driver_id`) REFERENCES `drivers`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── Vehicles ─────────────────────────────────────────────────

CREATE TABLE `vehicles` (
  `id` CHAR(36) NOT NULL PRIMARY KEY,
  `category` ENUM('economy','comfort','business','suv','minivan','minibus','bus','airport','corporate') NOT NULL,
  `make` VARCHAR(100) NOT NULL,
  `model` VARCHAR(100) NOT NULL,
  `year` SMALLINT NOT NULL,
  `plate_number` VARCHAR(20) NOT NULL,
  `color` VARCHAR(50) DEFAULT NULL,
  `passengers` TINYINT NOT NULL DEFAULT 4,
  `luggage` TINYINT NOT NULL DEFAULT 2,
  `active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_vehicles_category` (`category`)
) ENGINE=InnoDB;

-- ── Saved Addresses ──────────────────────────────────────────

CREATE TABLE `saved_addresses` (
  `id` CHAR(36) NOT NULL PRIMARY KEY,
  `user_id` CHAR(36) NOT NULL,
  `label` VARCHAR(100) NOT NULL,
  `formatted_address` VARCHAR(500) NOT NULL,
  `lat` DECIMAL(10,7) NOT NULL,
  `lng` DECIMAL(10,7) NOT NULL,
  `place_id` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── Bookings ─────────────────────────────────────────────────

CREATE TABLE `bookings` (
  `id` CHAR(36) NOT NULL PRIMARY KEY,
  `customer_id` CHAR(36) NOT NULL,
  `driver_id` CHAR(36) DEFAULT NULL,
  `vehicle_category` ENUM('economy','comfort','business','suv','minivan','minibus','bus','airport','corporate') NOT NULL,
  `origin_address` VARCHAR(500) NOT NULL,
  `origin_lat` DECIMAL(10,7) NOT NULL,
  `origin_lng` DECIMAL(10,7) NOT NULL,
  `dest_address` VARCHAR(500) NOT NULL,
  `dest_lat` DECIMAL(10,7) NOT NULL,
  `dest_lng` DECIMAL(10,7) NOT NULL,
  `status` ENUM('pending','confirmed','assigned','en_route','arrived','in_progress','completed','cancelled') NOT NULL DEFAULT 'pending',
  `distance_km` DECIMAL(8,2) DEFAULT NULL,
  `duration_min` INT DEFAULT NULL,
  `base_price` DECIMAL(10,2) DEFAULT NULL,
  `total_price` DECIMAL(10,2) NOT NULL,
  `currency` VARCHAR(3) NOT NULL DEFAULT 'AZN',
  `surge_multiplier` DECIMAL(4,2) NOT NULL DEFAULT 1.00,
  `scheduled_at` TIMESTAMP NULL DEFAULT NULL,
  `flight_number` VARCHAR(20) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `rating` TINYINT DEFAULT NULL,
  `rating_comment` TEXT DEFAULT NULL,
  `payment_method` VARCHAR(50) DEFAULT 'cash',
  `promo_code` VARCHAR(50) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`customer_id`) REFERENCES `users`(`id`),
  FOREIGN KEY (`driver_id`) REFERENCES `drivers`(`user_id`),
  INDEX `idx_bookings_status` (`status`),
  INDEX `idx_bookings_customer` (`customer_id`),
  INDEX `idx_bookings_driver` (`driver_id`),
  INDEX `idx_bookings_created` (`created_at`)
) ENGINE=InnoDB;

-- ── Payment Methods ──────────────────────────────────────────

CREATE TABLE `payment_methods` (
  `id` CHAR(36) NOT NULL PRIMARY KEY,
  `user_id` CHAR(36) NOT NULL,
  `type` ENUM('card','bank_transfer') NOT NULL,
  `last_four` VARCHAR(4) DEFAULT NULL,
  `brand` VARCHAR(20) DEFAULT NULL,
  `is_default` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── Promotions ───────────────────────────────────────────────

CREATE TABLE `promotions` (
  `id` CHAR(36) NOT NULL PRIMARY KEY,
  `code` VARCHAR(50) NOT NULL UNIQUE,
  `description` VARCHAR(255) DEFAULT NULL,
  `discount_type` ENUM('percentage','fixed') NOT NULL,
  `discount_value` DECIMAL(10,2) NOT NULL,
  `max_uses` INT DEFAULT NULL,
  `current_uses` INT NOT NULL DEFAULT 0,
  `valid_from` TIMESTAMP NOT NULL,
  `valid_until` TIMESTAMP NOT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ── Pricing Rules ────────────────────────────────────────────

CREATE TABLE `pricing_rules` (
  `id` CHAR(36) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `type` ENUM('zone','airport','dynamic','global') NOT NULL,
  `multiplier` DECIMAL(4,2) NOT NULL DEFAULT 1.00,
  `fixed_price` DECIMAL(10,2) DEFAULT NULL,
  `conditions` JSON DEFAULT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ── Notifications ────────────────────────────────────────────

CREATE TABLE `notifications` (
  `id` CHAR(36) NOT NULL PRIMARY KEY,
  `user_id` CHAR(36) NOT NULL,
  `channel` ENUM('sms','email','push','whatsapp') NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `body` TEXT NOT NULL,
  `is_read` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX `idx_notifications_user` (`user_id`, `is_read`)
) ENGINE=InnoDB;

-- ── Blog Posts ───────────────────────────────────────────────

CREATE TABLE `blog_posts` (
  `id` CHAR(36) NOT NULL PRIMARY KEY,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `title` VARCHAR(500) NOT NULL,
  `excerpt` TEXT DEFAULT NULL,
  `content` LONGTEXT NOT NULL,
  `language` ENUM('az','en','ru','tr','ar') NOT NULL DEFAULT 'en',
  `published` TINYINT(1) NOT NULL DEFAULT 0,
  `author_id` CHAR(36) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_blog_lang_pub` (`language`, `published`)
) ENGINE=InnoDB;

-- ── SEO Meta ─────────────────────────────────────────────────

CREATE TABLE `seo_meta` (
  `id` CHAR(36) NOT NULL PRIMARY KEY,
  `page_path` VARCHAR(255) NOT NULL,
  `language` ENUM('az','en','ru','tr','ar') NOT NULL,
  `title` VARCHAR(255) DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `keywords` TEXT DEFAULT NULL,
  `og_image` VARCHAR(500) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE INDEX `idx_seo_page_lang` (`page_path`, `language`)
) ENGINE=InnoDB;

-- ── Contact Messages ─────────────────────────────────────────

CREATE TABLE `contact_messages` (
  `id` CHAR(36) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `is_read` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ── Default Admin User ───────────────────────────────────────
-- Password: admin123 (bcrypt hash)
INSERT INTO `users` (`id`, `email`, `phone`, `name`, `password_hash`, `role`, `language`)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'admin@aztransfer.az',
  '+994558535055',
  'Admin',
  '$2y$10$YourBcryptHashHere',
  'admin',
  'en'
);

-- ── Default Pricing Rules ────────────────────────────────────
INSERT INTO `pricing_rules` (`id`, `name`, `type`, `multiplier`, `active`) VALUES
('p0000000-0000-0000-0000-000000000001', 'Global 20% Markup', 'global', 1.20, 1);

INSERT INTO `pricing_rules` (`id`, `name`, `type`, `fixed_price`, `active`, `conditions`) VALUES
('p0000000-0000-0000-0000-000000000002', 'Airport to City Center', 'airport', 25.00, 1, '{"zone": "city-center"}'),
('p0000000-0000-0000-0000-000000000003', 'Airport to Seaside', 'airport', 30.00, 1, '{"zone": "seaside"}');

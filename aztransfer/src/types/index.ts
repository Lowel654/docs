// ============================================================
// AZTRANSFER.AZ – Core Type Definitions
// ============================================================

export type Locale = 'az' | 'en' | 'ru' | 'tr' | 'ar';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Address {
  id?: string;
  label?: string;
  formatted: string;
  coordinates: Coordinates;
  placeId?: string;
}

// ── Vehicle ──────────────────────────────────────────────────
export type VehicleCategory =
  | 'economy'
  | 'comfort'
  | 'business'
  | 'suv'
  | 'minivan'
  | 'minibus'
  | 'bus'
  | 'airport'
  | 'corporate';

export interface VehicleType {
  id: string;
  category: VehicleCategory;
  name: string;
  description: string;
  image: string;
  passengers: number;
  luggage: number;
  eta: number; // minutes
  pricePerKm: number;
  basePrice: number;
  minPrice: number;
}

// ── Pricing ──────────────────────────────────────────────────
export interface PriceEstimate {
  vehicleId: string;
  category: VehicleCategory;
  distance: number; // km
  duration: number; // minutes
  basePrice: number;
  distancePrice: number;
  totalPrice: number;
  currency: string;
  surgeMultiplier: number;
}

export interface PricingRule {
  id: string;
  name: string;
  type: 'zone' | 'airport' | 'dynamic' | 'global';
  multiplier: number;
  fixedPrice?: number;
  conditions?: Record<string, unknown>;
  active: boolean;
}

// ── Booking ──────────────────────────────────────────────────
export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'assigned'
  | 'en_route'
  | 'arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface Booking {
  id: string;
  customerId: string;
  driverId?: string;
  vehicleCategory: VehicleCategory;
  origin: Address;
  destination: Address;
  status: BookingStatus;
  price: PriceEstimate;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
  flightNumber?: string;
  notes?: string;
  rating?: number;
  paymentMethod?: string;
  promoCode?: string;
}

// ── User / Auth ──────────────────────────────────────────────
export type UserRole = 'customer' | 'driver' | 'dispatcher' | 'admin';

export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  role: UserRole;
  avatar?: string;
  language: Locale;
  createdAt: string;
}

export interface Driver extends User {
  role: 'driver';
  isOnline: boolean;
  currentLocation?: Coordinates;
  vehicleId?: string;
  rating: number;
  totalTrips: number;
  documents: DriverDocument[];
}

export interface DriverDocument {
  id: string;
  type: 'license' | 'registration' | 'insurance' | 'id';
  fileUrl: string;
  expiresAt: string;
  verified: boolean;
}

// ── Fleet ────────────────────────────────────────────────────
export interface FleetVehicle {
  id: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  category: VehicleCategory;
  description: string;
  features: string[];
  images: string[];
  passengers: number;
  luggage: number;
}

// ── Airport ──────────────────────────────────────────────────
export interface FlightInfo {
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  scheduledArrival: string;
  estimatedArrival: string;
  status: 'on_time' | 'delayed' | 'cancelled' | 'landed';
  terminal?: string;
  gate?: string;
}

// ── Notifications ────────────────────────────────────────────
export type NotificationChannel = 'sms' | 'email' | 'push' | 'whatsapp';

export interface Notification {
  id: string;
  userId: string;
  channel: NotificationChannel;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

// ── Admin Stats ──────────────────────────────────────────────
export interface DashboardStats {
  totalRevenue: number;
  totalBookings: number;
  activeDrivers: number;
  totalCustomers: number;
  revenueChart: { date: string; amount: number }[];
  bookingsByCategory: { category: VehicleCategory; count: number }[];
}

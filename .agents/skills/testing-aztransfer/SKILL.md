---
name: testing-aztransfer
description: End-to-end testing procedure for the AZTRANSFER.AZ Next.js ride-sharing application. Use when verifying frontend UI, page rendering, navigation, forms, and PWA functionality.
---

# Testing AZTRANSFER.AZ

## Prerequisites

- Node.js installed
- Dependencies installed: `cd aztransfer && npm install`

## Devin Secrets Needed

- `GOOGLE_MAPS_API_KEY` (optional) — enables full booking flow testing with autocomplete, route drawing, and distance calculation. Without it, the haversine fallback exists in code but cannot be triggered via UI since AddressInput requires Google Places Autocomplete to fire `onSelect` with coordinates.

## Dev Server Setup

1. Clear stale `.next` cache if the server was previously running: `rm -rf aztransfer/.next`
2. Start dev server: `cd aztransfer && npx next dev`
3. Wait for "Ready" message and verify HTTP 200: `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/en`
4. If pages return Server Error about missing modules (e.g., `Cannot find module './8948.js'`), the `.next` cache is stale — delete it and restart the dev server.

## Known Gotchas

- **React infinite re-render loops**: If `useTranslation()` hook returns a new function reference on every render (not wrapped in `useCallback`), any component with a `useEffect` depending on `t` will loop infinitely. Symptom: "Maximum update depth exceeded" in console. Fix: wrap the translate function in `useCallback` with `[locale]` dependency.
- **Nested HTML/body tags**: The root layout (`src/app/layout.tsx`) and locale layout (`src/app/[locale]/layout.tsx`) both render `<html>` and `<body>` tags. This causes SSR hydration warnings (`Prop 'type' did not match`) but pages render correctly. Next.js SSG handles this at build time.
- **HMR full reloads**: After restarting the dev server, you may see "Fast Refresh had to perform a full reload" warnings. These are normal after cache clearing and don't affect testing.
- **Next.js version**: The project uses Next.js 14.2.35 which is outdated. The "outdated version" banner in error pages is expected.

## Test Cases

All tests navigate via browser to `http://localhost:3000/en/<path>`. Check console for errors after each test.

### 1. Homepage Booking UI (`/en`)
- Verify page title contains "AZTRANSFER.AZ"
- "Where from?" and "Where to?" inputs visible
- WhatsApp FAB links to `wa.me/994558535055`
- Vehicle selector shows 9+ vehicle type buttons
- No console errors (especially no "Maximum update depth exceeded")

### 2. Fleet Page (`/en/fleet`)
- Top bar: phone `+994 55 853 50 55`, WhatsApp link
- Language selector: 5 options (AZ, EN, RU, TR, AR)
- Nav links: Airport Transfer, Fleet, Corporate Services, About Us, Contact
- Hero: "Our Fleet" title
- 7 vehicle cards with passenger/luggage counts, features, Book Now buttons
- Footer: correct phones, email, copyright

### 3. Language Switching
- On any page, use language selector dropdown
- Select "Azərbaycanca" — URL should change to `/az/...`
- Content should translate (e.g., "Where from?" → "Haradan?")

### 4. Contact Page (`/en/contact`)
- Phone, email, WhatsApp links with correct values
- "24/7 Customer Support" section
- Contact form with Name, Email, Message fields

### 5. Contact Form Submission
- Fill all fields and click "Send Message"
- Should show "Message Sent!" success state

### 6. FAQ Accordion (`/en/faq`)
- 8 collapsible FAQ items
- Clicking one expands it, clicking another collapses the first
- First answer mentions booking via website/WhatsApp

### 7. Admin Dashboard (`/en/admin`)
- 4 stat cards: Revenue (12,450 AZN), Bookings (234), Drivers (18), Customers (1,250)
- Revenue chart placeholder
- 10 management links

### 8. Login Page (`/en/login`)
- AZTRANSFER.AZ branding
- Email, Password fields, Sign In button
- Forgot Password and Sign Up links

### 9. Airport Transfer (`/en/airport`)
- Flight number input with "Track Flight" button
- 4 feature cards (Track Flight, Meet & Greet, Arrival Monitoring, 24/7)
- Pricing table with vehicle tiers

### 10. Mobile Navigation
- Check DOM for mobile menu button (`aria-label="Open menu"`)
- Verify all required nav links present (Home, Airport Transfer, Fleet, Corporate, Bus Services, About, Contact, Blog, FAQ, Privacy, Terms, Login, Register, Account, Bookings, Addresses, Payments)

### 11. PWA Manifest (`/manifest.json`)
- Valid JSON
- `name` contains "AZTRANSFER.AZ"
- `display: "standalone"`, icons array present

### 12. Driver Panel (`/en/driver`)
- Offline/Online toggle button
- Stats: Today's Trips, Earnings, Rating
- Links: Trip History, Earnings Dashboard, Documents

## Console Errors to Expect

- `Google Maps API key not set` warning — normal without API key
- SSR hydration `Prop 'type' did not match` — from nested layout issue, non-blocking
- HMR reload warnings after server restart — normal

## Console Errors That Indicate Bugs

- `Maximum update depth exceeded` — infinite re-render loop, likely unstable hook reference
- `Cannot find module` — stale `.next` cache, delete and restart
- Any unhandled runtime error

'use client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/hooks/useTranslation';

export default function TermsPage() {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <main className="min-h-screen py-20 px-4 bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <h1>{t('terms.title')}</h1>
          <p>Last updated: June 2025</p>
          <h2>1. Acceptance of Terms</h2>
          <p>By using AZTRANSFER.AZ services, you agree to these terms and conditions.</p>
          <h2>2. Services</h2>
          <p>AZTRANSFER.AZ provides airport transfer, chauffeur, and corporate transportation services in Azerbaijan.</p>
          <h2>3. Bookings &amp; Cancellations</h2>
          <p>Bookings can be made online, via WhatsApp, or by phone. Free cancellation is available up to 2 hours before the scheduled pickup.</p>
          <h2>4. Pricing</h2>
          <p>Prices shown at the time of booking are final unless the route is significantly changed. Airport transfers have fixed pricing.</p>
          <h2>5. Payment</h2>
          <p>Payment can be made in cash, by card, or via bank transfer. Corporate clients may arrange monthly billing.</p>
          <h2>6. Liability</h2>
          <p>While we strive for on-time service, AZTRANSFER.AZ is not liable for delays caused by traffic, weather, or other force majeure events.</p>
          <h2>7. Contact</h2>
          <p>For questions regarding these terms, contact info@aztransfer.az.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}

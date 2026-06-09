'use client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/hooks/useTranslation';

export default function PrivacyPage() {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <main className="min-h-screen py-20 px-4 bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <h1>{t('privacy.title')}</h1>
          <p>Last updated: June 2025</p>
          <h2>1. Information We Collect</h2>
          <p>We collect personal information you provide when booking a transfer, creating an account, or contacting us. This includes your name, email, phone number, and location data.</p>
          <h2>2. How We Use Your Information</h2>
          <p>Your information is used to provide transfer services, process payments, communicate about bookings, and improve our services.</p>
          <h2>3. Data Sharing</h2>
          <p>We share necessary information with assigned drivers to complete your trip. We do not sell your data to third parties.</p>
          <h2>4. Data Security</h2>
          <p>We use industry-standard encryption and security measures to protect your personal data.</p>
          <h2>5. Your Rights</h2>
          <p>You have the right to access, modify, or delete your personal data. Contact us at info@aztransfer.az for any requests.</p>
          <h2>6. Cookies</h2>
          <p>We use essential cookies for site functionality and analytics cookies to improve our service. You can manage cookies in your browser settings.</p>
          <h2>7. Contact</h2>
          <p>For privacy-related inquiries, contact us at info@aztransfer.az or call +994 55 853 50 55.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AZTRANSFER.AZ — Airport Transfer & Chauffeur Service',
  description: 'Professional airport transfer service in Baku, Azerbaijan',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AZTRANSFER.AZ — Airport Transfer & Chauffeur Service',
  description: 'Professional airport transfer service in Baku, Azerbaijan',
};

const deviceRedirectScript = `
(function() {
  var ua = navigator.userAgent || navigator.vendor || window.opera;
  var isAndroid = /Android/i.test(ua);
  var isIOS = /iPhone|iPad|iPod/i.test(ua);
  var isPWA = window.matchMedia('(display-mode: standalone)').matches
    || window.navigator.standalone === true;

  // Do not redirect if already in PWA / installed app mode
  if (isPWA) return;

  if (isAndroid) {
    window.location.href = 'https://aztransfer.az/downloads/aztransfer.apk';
    return;
  }

  if (isIOS) {
    window.location.href = 'https://apps.apple.com/app/aztransfer-az/id000000000';
    return;
  }

  // Desktop: do nothing, load normally
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: deviceRedirectScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

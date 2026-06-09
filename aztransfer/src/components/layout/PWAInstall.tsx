'use client';

import { useEffect } from 'react';

export default function PWAInstall() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // SW registration failed, PWA features unavailable
      });
    }
  }, []);

  return null;
}

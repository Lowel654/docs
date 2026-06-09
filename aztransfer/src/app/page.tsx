'use client';

import { useEffect } from 'react';
import { detectLocale } from '@/lib/utils';

export default function RootPage() {
  useEffect(() => {
    const locale = detectLocale();
    window.location.replace(`/${locale}`);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <div className="text-3xl font-bold mb-2">
          <span className="text-yellow-400">AZ</span>TRANSFER<span className="text-yellow-400">.AZ</span>
        </div>
        <div className="animate-pulse text-gray-400 text-sm">Loading...</div>
      </div>
    </div>
  );
}

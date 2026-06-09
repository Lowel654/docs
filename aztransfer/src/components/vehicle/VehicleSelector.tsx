'use client';

import { useState, useRef } from 'react';
import { VehicleType, PriceEstimate } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { formatPrice } from '@/lib/pricing';
import { cn } from '@/lib/utils';

interface Props {
  vehicles: VehicleType[];
  prices: PriceEstimate[];
  selected: string | null;
  onSelect: (vehicleId: string) => void;
  onBook: () => void;
  visible: boolean;
}

export default function VehicleSelector({ vehicles, prices, selected, onSelect, onBook, visible }: Props) {
  const { t } = useTranslation();
  const [, setDragging] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const startY = useRef(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  const priceMap = new Map(prices.map((p) => [p.vehicleId, p]));

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    setDragging(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = startY.current - e.changedTouches[0].clientY;
    if (delta > 50) setExpanded(true);
    if (delta < -50) setExpanded(false);
    setDragging(false);
  };

  return (
    <div
      ref={sheetRef}
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 rounded-t-2xl shadow-2xl',
        'transform transition-transform duration-300 ease-out',
        'border-t border-gray-200 dark:border-gray-800',
        'safe-area-bottom',
        visible ? 'translate-y-0' : 'translate-y-full',
        expanded ? 'max-h-[85vh]' : 'max-h-[55vh]'
      )}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Drag handle */}
      <div
        className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="w-10 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
      </div>

      <div className="px-4 pb-2">
        <h3 className="font-semibold text-base">{t('booking.selectVehicle')}</h3>
      </div>

      {/* Vehicle list */}
      <div className="overflow-y-auto px-2" style={{ maxHeight: expanded ? '60vh' : '30vh' }}>
        {vehicles.map((v) => {
          const price = priceMap.get(v.id);
          const isSelected = selected === v.id;

          return (
            <button
              key={v.id}
              onClick={() => onSelect(v.id)}
              className={cn(
                'w-full flex items-center gap-3 p-3 rounded-xl transition-all mb-1',
                'active:scale-[0.98]',
                isSelected
                  ? 'bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 border-2 border-transparent'
              )}
            >
              {/* Vehicle image placeholder */}
              <div className="w-20 h-14 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                <svg className="w-12 h-8 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
              </div>

              {/* Info */}
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[15px]">{v.name}</span>
                  {price && (
                    <span className="font-bold text-[15px]">
                      {formatPrice(price.totalPrice)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                  <span className="flex items-center gap-0.5">
                    <UserIcon /> {v.passengers}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <LuggageIcon /> {v.luggage}
                  </span>
                  <span>~{v.eta} {t('booking.min')}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Book button */}
      {selected && (
        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={onBook}
            className="w-full bg-black dark:bg-yellow-400 dark:text-black text-white font-semibold py-3.5 rounded-xl text-[15px] active:scale-[0.98] transition-transform"
          >
            {t('booking.confirmBooking')} — {formatPrice(priceMap.get(selected)?.totalPrice ?? 0)}
          </button>
        </div>
      )}
    </div>
  );
}

function UserIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  );
}

function LuggageIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 6h-2V3c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v3H7c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2 0 .55.45 1 1 1s1-.45 1-1h6c0 .55.45 1 1 1s1-.45 1-1c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 3h4v3h-4V3z"/>
    </svg>
  );
}

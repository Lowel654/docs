'use client';

import { useRef, useEffect, useState } from 'react';
import { Address } from '@/types';

interface Props {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSelect: (address: Address) => void;
  icon: 'origin' | 'destination';
}

export default function AddressInput({ placeholder, value, onChange, onSelect, icon }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!inputRef.current || typeof google === 'undefined' || !google.maps?.places) return;
    if (autocompleteRef.current) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: 'az' },
      fields: ['formatted_address', 'geometry', 'place_id', 'name'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry?.location) {
        onSelect({
          formatted: place.formatted_address || place.name || '',
          coordinates: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
          placeId: place.place_id,
        });
        onChange(place.formatted_address || place.name || '');
      }
    });

    autocompleteRef.current = autocomplete;
  }, [onSelect, onChange]);

  return (
    <div className={`flex items-center gap-3 px-4 py-3 transition-colors ${focused ? 'bg-gray-50 dark:bg-gray-800' : ''}`}>
      <div className="flex-shrink-0">
        {icon === 'origin' ? (
          <div className="w-3 h-3 rounded-full bg-green-500 ring-2 ring-green-200" />
        ) : (
          <div className="w-3 h-3 rounded-sm bg-black dark:bg-white ring-2 ring-gray-300" />
        )}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-gray-400"
      />
    </div>
  );
}

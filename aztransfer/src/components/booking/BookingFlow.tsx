'use client';

import { useState, useCallback, useEffect } from 'react';
import { Address, Coordinates, PriceEstimate } from '@/types';
import { VEHICLE_TYPES } from '@/config/vehicles';
import { calculatePrice } from '@/lib/pricing';
import { useTranslation } from '@/hooks/useTranslation';
import GoogleMap from '@/components/map/GoogleMap';
import AddressInput from './AddressInput';
import VehicleSelector from '@/components/vehicle/VehicleSelector';
import { cn } from '@/lib/utils';

export default function BookingFlow() {
  const { t } = useTranslation();

  const [origin, setOrigin] = useState<Address | null>(null);
  const [destination, setDestination] = useState<Address | null>(null);
  const [originText, setOriginText] = useState('');
  const [destText, setDestText] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [prices, setPrices] = useState<PriceEstimate[]>([]);
  const [routeInfo, setRouteInfo] = useState<{ distance: number; duration: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [showVehicles, setShowVehicles] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

  // Detect user location
  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: Coordinates = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setOrigin({ formatted: t('booking.myLocation'), coordinates: coords });
        setOriginText(t('booking.myLocation'));
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [t]);

  // Calculate route and prices when both addresses are set
  useEffect(() => {
    if (!origin || !destination) {
      setShowVehicles(false);
      return;
    }

    if (typeof google === 'undefined' || !google.maps) {
      // Fallback: estimate with straight-line distance
      const R = 6371;
      const dLat = ((destination.coordinates.lat - origin.coordinates.lat) * Math.PI) / 180;
      const dLng = ((destination.coordinates.lng - origin.coordinates.lng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((origin.coordinates.lat * Math.PI) / 180) *
          Math.cos((destination.coordinates.lat * Math.PI) / 180) *
          Math.sin(dLng / 2) ** 2;
      const dist = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const duration = Math.round((dist / 40) * 60); // assume 40km/h avg
      setRouteInfo({ distance: Math.round(dist * 10) / 10, duration });
      const priceEstimates = VEHICLE_TYPES.map((v) => calculatePrice(v, dist, duration));
      setPrices(priceEstimates);
      setShowVehicles(true);
      setSearchExpanded(false);
      return;
    }

    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin.coordinates],
        destinations: [destination.coordinates],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK && response) {
          const el = response.rows[0].elements[0];
          if (el.status === 'OK') {
            const distKm = el.distance.value / 1000;
            const durMin = Math.round(el.duration.value / 60);
            setRouteInfo({ distance: Math.round(distKm * 10) / 10, duration: durMin });

            const priceEstimates = VEHICLE_TYPES.map((v) =>
              calculatePrice(v, distKm, durMin)
            );
            setPrices(priceEstimates);
            setShowVehicles(true);
            setSearchExpanded(false);
          }
        }
      }
    );
  }, [origin, destination]);

  const handleBook = useCallback(() => {
    if (!selectedVehicle || !origin || !destination) return;
    const price = prices.find((p) => p.vehicleId === selectedVehicle);
    // In production, this would create a booking via API
    alert(
      `Booking confirmed!\n\nFrom: ${origin.formatted}\nTo: ${destination.formatted}\nVehicle: ${selectedVehicle}\nPrice: ${price?.totalPrice} ${price?.currency}`
    );
  }, [selectedVehicle, origin, destination, prices]);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      {/* Full-screen map */}
      <GoogleMap
        origin={origin?.coordinates}
        destination={destination?.coordinates}
        className="absolute inset-0 z-0"
      />

      {/* Search panel - overlaid on map */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 z-30 transition-all duration-300',
          searchExpanded ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur' : ''
        )}
      >
        {/* Compact search bar */}
        <div
          className={cn(
            'mx-4 mt-3 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800',
            'transition-all duration-300',
            searchExpanded ? 'rounded-b-none shadow-none border-b-0' : ''
          )}
        >
          <div onClick={() => !searchExpanded && setSearchExpanded(true)}>
            <AddressInput
              placeholder={t('booking.whereFrom')}
              value={originText}
              onChange={setOriginText}
              onSelect={(addr) => {
                setOrigin(addr);
                setOriginText(addr.formatted);
              }}
              icon="origin"
            />
          </div>

          <div className="border-t border-gray-100 dark:border-gray-800 ml-10 mr-4" />

          <div onClick={() => !searchExpanded && setSearchExpanded(true)}>
            <AddressInput
              placeholder={t('booking.whereTo')}
              value={destText}
              onChange={setDestText}
              onSelect={(addr) => {
                setDestination(addr);
                setDestText(addr.formatted);
              }}
              icon="destination"
            />
          </div>
        </div>

        {/* Route info badge */}
        {routeInfo && !searchExpanded && (
          <div className="flex items-center justify-center gap-4 mt-2 mx-4">
            <span className="bg-white dark:bg-gray-900 text-xs font-medium px-3 py-1.5 rounded-full shadow border border-gray-200 dark:border-gray-700">
              {routeInfo.distance} {t('booking.km')}
            </span>
            <span className="bg-white dark:bg-gray-900 text-xs font-medium px-3 py-1.5 rounded-full shadow border border-gray-200 dark:border-gray-700">
              ~{routeInfo.duration} {t('booking.min')}
            </span>
          </div>
        )}
      </div>

      {/* My location button */}
      <button
        onClick={() => {
          if (typeof navigator === 'undefined' || !navigator.geolocation) return;
          setLocating(true);
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              setOrigin({
                formatted: t('booking.myLocation'),
                coordinates: { lat: pos.coords.latitude, lng: pos.coords.longitude },
              });
              setOriginText(t('booking.myLocation'));
              setLocating(false);
            },
            () => setLocating(false)
          );
        }}
        className="absolute right-4 bottom-[60vh] z-20 bg-white dark:bg-gray-900 w-11 h-11 rounded-full shadow-lg flex items-center justify-center border border-gray-200 dark:border-gray-700 active:scale-95 transition-transform"
        aria-label="My location"
      >
        {locating ? (
          <div className="w-5 h-5 border-2 border-gray-400 border-t-black rounded-full animate-spin" />
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
          </svg>
        )}
      </button>

      {/* Vehicle selector bottom sheet */}
      <VehicleSelector
        vehicles={VEHICLE_TYPES}
        prices={prices}
        selected={selectedVehicle}
        onSelect={setSelectedVehicle}
        onBook={handleBook}
        visible={showVehicles}
      />

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/994558535055?text=Hello!%20I%20need%20a%20transfer."
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'fixed z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-xl',
          'flex items-center justify-center',
          'active:scale-90 transition-all',
          showVehicles ? 'right-4 bottom-[58vh]' : 'right-4 bottom-6'
        )}
        aria-label="WhatsApp"
      >
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}

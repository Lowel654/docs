'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { Coordinates } from '@/types';
import { SITE } from '@/config/site';

interface Props {
  origin?: Coordinates | null;
  destination?: Coordinates | null;
  onMapReady?: (map: google.maps.Map) => void;
  className?: string;
}

export default function GoogleMap({ origin, destination, onMapReady, className }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const directionsRenderer = useRef<google.maps.DirectionsRenderer | null>(null);
  const originMarker = useRef<google.maps.Marker | null>(null);
  const destMarker = useRef<google.maps.Marker | null>(null);
  const [loaded, setLoaded] = useState(false);

  const initMap = useCallback(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = new google.maps.Map(mapRef.current, {
      center: SITE.coordinates,
      zoom: SITE.mapDefaultZoom,
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_CENTER },
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: [
        { featureType: 'poi', stylers: [{ visibility: 'off' }] },
        { featureType: 'transit', stylers: [{ visibility: 'off' }] },
      ],
    });

    mapInstance.current = map;
    directionsRenderer.current = new google.maps.DirectionsRenderer({
      map,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#000000',
        strokeWeight: 4,
        strokeOpacity: 0.8,
      },
    });

    onMapReady?.(map);
    setLoaded(true);
  }, [onMapReady]);

  // Load Google Maps script
  useEffect(() => {
    if (typeof google !== 'undefined' && google.maps) {
      initMap();
      return;
    }

    const apiKey = SITE.googleMapsApiKey;
    if (!apiKey) {
      console.warn('Google Maps API key not set');
      setLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&callback=initGoogleMap`;
    script.async = true;
    script.defer = true;

    (window as unknown as Record<string, unknown>).initGoogleMap = () => {
      initMap();
    };

    document.head.appendChild(script);

    return () => {
      delete (window as unknown as Record<string, unknown>).initGoogleMap;
    };
  }, [initMap]);

  // Update markers & route
  useEffect(() => {
    const map = mapInstance.current;
    if (!map || !loaded) return;

    // Origin marker
    if (origin) {
      if (originMarker.current) {
        originMarker.current.setPosition(origin);
      } else {
        originMarker.current = new google.maps.Marker({
          map,
          position: origin,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#22c55e',
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#fff',
            scale: 8,
          },
          zIndex: 10,
        });
      }
    }

    // Destination marker
    if (destination) {
      if (destMarker.current) {
        destMarker.current.setPosition(destination);
      } else {
        destMarker.current = new google.maps.Marker({
          map,
          position: destination,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#000000',
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#fff',
            scale: 8,
          },
          zIndex: 10,
        });
      }
    }

    // Draw route
    if (origin && destination && directionsRenderer.current) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            directionsRenderer.current?.setDirections(result);
          }
        }
      );
    }
  }, [origin, destination, loaded]);

  return (
    <div className={className}>
      <div ref={mapRef} className="w-full h-full" />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-pulse text-gray-500">Loading map...</div>
        </div>
      )}
    </div>
  );
}

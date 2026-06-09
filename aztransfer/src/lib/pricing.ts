import { PriceEstimate, VehicleType } from '@/types';
import { GLOBAL_PRICING_MULTIPLIER, AIRPORT_FIXED_PRICES, CURRENCY } from '@/config/vehicles';

export function calculatePrice(
  vehicle: VehicleType,
  distanceKm: number,
  durationMin: number,
  options?: {
    isAirport?: boolean;
    airportZone?: string;
    surgeMultiplier?: number;
  }
): PriceEstimate {
  const surge = options?.surgeMultiplier ?? 1;

  // Airport fixed pricing
  if (options?.isAirport && options.airportZone) {
    const fixed = AIRPORT_FIXED_PRICES[options.airportZone];
    if (fixed) {
      const total = fixed * surge * GLOBAL_PRICING_MULTIPLIER;
      return {
        vehicleId: vehicle.id,
        category: vehicle.category,
        distance: distanceKm,
        duration: durationMin,
        basePrice: fixed,
        distancePrice: 0,
        totalPrice: Math.round(total * 100) / 100,
        currency: CURRENCY,
        surgeMultiplier: surge,
      };
    }
  }

  const distancePrice = distanceKm * vehicle.pricePerKm;
  const rawTotal = vehicle.basePrice + distancePrice;
  const adjustedTotal = rawTotal * surge * GLOBAL_PRICING_MULTIPLIER;
  const totalPrice = Math.max(adjustedTotal, vehicle.minPrice);

  return {
    vehicleId: vehicle.id,
    category: vehicle.category,
    distance: distanceKm,
    duration: durationMin,
    basePrice: vehicle.basePrice,
    distancePrice: Math.round(distancePrice * 100) / 100,
    totalPrice: Math.round(totalPrice * 100) / 100,
    currency: CURRENCY,
    surgeMultiplier: surge,
  };
}

export function formatPrice(amount: number, currency: string = CURRENCY): string {
  return `${amount.toFixed(2)} ${currency}`;
}

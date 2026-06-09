export const SITE = {
  name: 'AZTRANSFER.AZ',
  url: 'https://aztransfer.az',
  email: 'info@aztransfer.az',
  phone: '+994 55 853 50 55',
  phoneAlt: '070 853 50 55',
  whatsapp: '+994558535055',
  whatsappDisplay: '+994 55 853 50 55',
  country: 'Azerbaijan',
  city: 'Baku',
  tagline: 'Airport Transfer & Chauffeur Services',
  copyright: `© ${new Date().getFullYear()} AZTRANSFER.AZ. All Rights Reserved.`,
  social: {
    instagram: 'https://instagram.com/aztransfer.az',
    facebook: 'https://facebook.com/aztransfer.az',
  },
  coordinates: { lat: 40.4093, lng: 49.8671 }, // Baku
  mapDefaultZoom: 13,
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
} as const;

export const KEYWORDS = {
  az: 'Bakı hava limanı transfer, Bakı taksi, Azərbaycan transfer xidməti, VIP transfer Bakı, korporativ nəqliyyat',
  en: 'Airport Transfer Baku, Baku Airport Taxi, Airport Transfer Azerbaijan, Baku Chauffeur Service, VIP Transfer Baku, Corporate Transportation Azerbaijan, Minivan Transfer Baku, Minibus Rental Baku, Bus Rental Azerbaijan',
  ru: 'Трансфер из аэропорта Баку, Такси аэропорт Баку, Трансфер Азербайджан, VIP трансфер Баку, корпоративный транспорт',
  tr: 'Bakü havalimanı transfer, Bakü havalimanı taksi, Azerbaycan transfer, VIP transfer Bakü, kurumsal ulaşım',
  ar: 'نقل المطار باكو، تاكسي مطار باكو، نقل أذربيجان، نقل VIP باكو، نقل الشركات',
} as const;

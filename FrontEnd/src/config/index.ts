export const API_URL = import.meta.env.VITE_API_URL;

export const APP_CONFIG = {
  name: 'Holidays Calendar',
  version: '1.0.0',
  
  // Configuración del calendario
  calendar: {
    minYear: 2020,
    maxYear: 2030,
    defaultYear: new Date().getFullYear(),
    locale: 'es-ES',
  },

  // Configuración de React Query
  reactQuery: {
    staleTime: 5 * 60 * 1000, // 5 minutos
    cacheTime: 30 * 60 * 1000, // 30 minutos
  },
} as const;


export const FEATURES = {
  devTools: import.meta.env.DEV,
  enableNotifications: true,
} as const;
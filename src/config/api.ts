// Configuración de la API
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  endpoints: {
    clients: '/clients',
  },
};

// Para desarrollo local, puedes usar:
// NEXT_PUBLIC_API_URL=/api npm run dev
// O crear un archivo .env.local con:
// NEXT_PUBLIC_API_URL=/api

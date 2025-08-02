// Configuración de la API
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://taller-ms-persistence:3001',
  endpoints: {
    clients: '/clients',
  },
};

// Para desarrollo local, puedes usar:
// NEXT_PUBLIC_API_URL=http://localhost:3001 npm run dev
// O crear un archivo .env.local con:
// NEXT_PUBLIC_API_URL=http://localhost:3001

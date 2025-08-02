import { Client } from '@/types';
import { API_CONFIG } from '@/config/api';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const api = {
  // Obtener todos los clientes
  async getClients(): Promise<Client[]> {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.clients}`);
      
      if (!response.ok) {
        throw new ApiError(response.status, `Error fetching clients: ${response.statusText}`);
      }
      
      const clients = await response.json();
      return clients;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(0, `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Crear un nuevo cliente
  async createClient(clientData: Omit<Client, 'id'>): Promise<Client> {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.clients}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });
      
      if (!response.ok) {
        throw new ApiError(response.status, `Error creating client: ${response.statusText}`);
      }
      
      const newClient = await response.json();
      return newClient;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(0, `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
};

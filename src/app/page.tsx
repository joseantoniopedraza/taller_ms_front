'use client';

import { useState, useEffect } from 'react';
import ClientForm from '@/components/ClientForm';
import ClientList from '@/components/ClientList';
import { Client } from '@/types';
import { api, ApiError } from '@/lib/api';

export default function Home() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar clientes al iniciar la aplicación
  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      setLoading(true);
      setError(null);
      const clientsData = await api.getClients();
      setClients(clientsData);
    } catch (error) {
      if (error instanceof ApiError) {
        setError(`Error ${error.status}: ${error.message}`);
      } else {
        setError('Error desconocido al cargar los clientes');
      }
      console.error('Error loading clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClient = async (newClient: Client) => {
    try {
      setError(null);
      // Crear cliente en la API (sin el ID ya que lo genera el backend)
      const { id, ...clientData } = newClient;
      const createdClient = await api.createClient(clientData);
      
      // Actualizar la lista local
      setClients(prev => [...prev, createdClient]);
      
      console.log('Cliente agregado exitosamente:', createdClient);
    } catch (error) {
      if (error instanceof ApiError) {
        setError(`Error al agregar cliente: ${error.message}`);
      } else {
        setError('Error desconocido al agregar el cliente');
      }
      console.error('Error adding client:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Sistema de Registro de Clientes
        </h1>

        {/* Mostrar errores si los hay */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <div className="flex justify-between items-center">
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="order-2 lg:order-1">
            <ClientForm onSubmit={handleAddClient} />
          </div>
          
          {/* Lista de clientes */}
          <div className="order-1 lg:order-2">
            <ClientList 
              users={clients} 
              loading={loading}
              onRefresh={loadClients}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

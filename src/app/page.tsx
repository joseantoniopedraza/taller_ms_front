'use client';

import { useState } from 'react';
import ClientForm from '@/components/ClientForm';
import ClientList from '@/components/ClientList';
import { Client } from '@/types';

export default function Home() {
  const [users, setUsers] = useState<Client[]>([]);

  const handleAddUser = (newUser: Client) => {
    console.log('Agregando nuevo cliente:', newUser);
    setUsers(prevUsers => [...prevUsers, newUser]);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Registro de Clientes
          </h1>
        </div>

        {/* Layout responsivo: columnas en desktop, apilado en mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="order-1">
            <ClientForm onSubmit={handleAddUser} />
          </div>

          {/* Lista de clientes */}
          <div className="order-2">
            <ClientList users={users} />
          </div>
        </div>
      </div>
    </main>
  );
}

'use client';

import { Client } from '@/types';

interface ClientListProps {
  users: Client[];
}

export default function ClientList({ users }: ClientListProps) {
  if (users.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Lista de Clientes</h2>
        <p className="text-gray-500 text-center py-8">
          No hay clientes registrados aún.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Lista de Clientes ({users.length})
      </h2>
      
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-800">{user.nombre}</span>
                <span className="text-gray-500">•</span>
                <a 
                  href={`mailto:${user.mail}`}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {user.mail}
                </a>
              </div>
              
              <div>
                <span className="text-sm text-gray-600 font-medium">Intereses:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.intereses.map((interes, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {interes}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

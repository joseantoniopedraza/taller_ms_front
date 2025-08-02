'use client';

import { Client } from '@/types';

interface ClientListProps {
  users: Client[];
  loading?: boolean;
  onRefresh?: () => void;
}

export default function ClientList({ users, loading = false, onRefresh }: ClientListProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Lista de Clientes</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Cargando clientes...</span>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Lista de Clientes</h2>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Actualizar
            </button>
          )}
        </div>
        <p className="text-gray-500 text-center py-8">
          No hay clientes registrados aún.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Lista de Clientes ({users.length})
        </h2>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Actualizar
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-800">{user.name}</span>
                <span className="text-gray-500">•</span>
                <a 
                  href={`mailto:${user.email}`}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {user.email}
                </a>
              </div>
              
              <div>
                <span className="text-sm text-gray-600 font-medium">Intereses:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.interests.map((interes, index) => (
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

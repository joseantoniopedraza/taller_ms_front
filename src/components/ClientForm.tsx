'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientSchema, ClientFormData } from '@/lib/validation';
import { Client } from '@/types';

interface ClientFormProps {
  onSubmit: (data: Client) => void;
}

const predefinedInterests = [
  'Alimento',
  'Control de calidad',
  'Logística',
  'Especialidades médicas',
  'Maquinaria',
  'Tecnología',
  'Construcción',
];

export default function ClientForm({ onSubmit }: ClientFormProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [customInterest, setCustomInterest] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema)
  });

  const addInterest = (interest: string) => {
    if (!selectedInterests.includes(interest)) {
      const newInterests = [...selectedInterests, interest];
      setSelectedInterests(newInterests);
      setValue('intereses', newInterests);
    }
  };

  const removeInterest = (interest: string) => {
    const newInterests = selectedInterests.filter(i => i !== interest);
    setSelectedInterests(newInterests);
    setValue('intereses', newInterests);
  };

  const addCustomInterest = () => {
    if (customInterest.trim() && !selectedInterests.includes(customInterest.trim())) {
      addInterest(customInterest.trim());
      setCustomInterest('');
    }
  };

  const onFormSubmit = (data: ClientFormData) => {
    const client: Client = {
      id: Date.now().toString(),
      ...data,
      intereses: selectedInterests
    };
    onSubmit(client);
    reset();
    setSelectedInterests([]);
    setCustomInterest('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Registro de Cliente</h2>
      
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Campo Nombre */}
        <div>
          <label htmlFor="nombre" className="block text-md font-medium text-gray-700 mb-2">
            Nombre
          </label>
          <input
            {...register('nombre')}
            type="text"
            id="nombre"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ingresa tu nombre"
          />
          {errors.nombre && (
            <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
          )}
        </div>

        {/* Campo Email */}
        <div>
          <label htmlFor="mail" className="block text-md font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            {...register('mail')}
            type="email"
            id="mail"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="ejemplo@correo.com"
          />
          {errors.mail && (
            <p className="mt-1 text-sm text-red-600">{errors.mail.message}</p>
          )}
        </div>

        {/* Campo Intereses */}
        <div>
          <label className="block text-md font-medium text-gray-700 mb-2">
            Intereses
          </label>
          
          {/* Intereses predefinidos */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Selecciona los intereses:</p>
            <div className="flex flex-wrap gap-2">
              {predefinedInterests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => addInterest(interest)}
                  disabled={selectedInterests.includes(interest)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedInterests.includes(interest)
                      ? 'bg-blue-500 text-white cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Agregar interés personalizado */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Agregar otro interés:</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={customInterest}
                onChange={(e) => setCustomInterest(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Escribe un interés personalizado"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomInterest())}
              />
              <button
                type="button"
                onClick={addCustomInterest}
                className="px-4 py-2 bg-white text-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 hover:text-white transition-colors"
              >
                Agregar
              </button>
            </div>
          </div>

          {/* Intereses seleccionados */}
          {selectedInterests.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-2">Intereses seleccionados:</p>
              <div className="flex flex-wrap gap-2">
                {selectedInterests.map((interest) => (
                  <span
                    key={interest}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() => removeInterest(interest)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {errors.intereses && (
            <p className="mt-1 text-sm text-red-600">{errors.intereses.message}</p>
          )}
        </div>

        {/* Botón Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium"
        >
          Registrar Cliente
        </button>
      </form>
    </div>
  );
}

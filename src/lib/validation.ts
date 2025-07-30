import { z } from 'zod';

export const clientSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  mail: z.string().email('Debe ser un email válido'),
  intereses: z.array(z.string()).min(1, 'Debe seleccionar al menos un interés'),
});

export type ClientFormData = z.infer<typeof clientSchema>;

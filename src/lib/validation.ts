import { z } from 'zod';

export const clientSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Debe ser un email válido'),
  interests: z.array(z.string()).min(1, 'Debe seleccionar al menos un interés'),
});

export type ClientFormData = z.infer<typeof clientSchema>;

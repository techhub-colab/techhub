import { z } from 'zod';
import { isValidPassword } from '~/utils/validation';

export const personalDetailsSchema = z.object({
  email: z.email({ error: 'Invalid email address!' })
});

export const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, { error: 'Password must be at least 8 characters long' })
    .max(30, { error: 'Password cannot be longer than 30 characters' })
    .refine(isValidPassword, { error: 'New password contains illegal characters' }),
  confirmPassword: z.string().min(1, { error: 'Please confirm your password!' })
}).refine((values) => values.password === values.confirmPassword, {
  error: 'Passwords do not match!',
  path: ['confirmPassword']
});

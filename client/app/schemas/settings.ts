import { z } from 'zod';

export const personalDetailsSchema = z.object({
  email: z.email({ message: 'Invalid email address!' })
});
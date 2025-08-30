import { z } from 'zod';

export const personalDetailsSchema = z.object({
  email: z.email({ error: 'Invalid email address!' })
});
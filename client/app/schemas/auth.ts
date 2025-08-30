import { z } from 'zod';

export const loginFormSchema = z.object({
  username: z.string().min(1, { error: 'Please enter username' }),
  password: z.string().min(1, { error: 'Please enter password' })
});

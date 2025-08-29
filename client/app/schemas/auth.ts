import { z } from 'zod';

export const loginFormSchema = z.object({
  username: z.string().min(1, { message: 'Please enter username' }),
  password: z.string().min(1, { message: 'Please enter password' })
});

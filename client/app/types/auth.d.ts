import { z } from 'zod';
import { loginFormSchema } from '~/schemas/auth';
import type { User } from '~/types/user';

export type LoginRequest = z.infer<typeof loginFormSchema>;

export type LoginResponse = {
  accessToken: string;
  user: User;
}

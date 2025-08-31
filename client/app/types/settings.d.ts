import { z } from 'zod';
import { type personalDetailsSchema, resetPasswordSchema } from '~/schemas/settings';

export type PersonalDetailsFormValues = z.infer<typeof personalDetailsSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

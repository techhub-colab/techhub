import { z } from 'zod';
import type { personalDetailsSchema, profileSchema, resetPasswordSchema } from '~/schemas/settings';

export type ProfileFormValues = z.infer<typeof profileSchema>;
export type PersonalDetailsFormValues = z.infer<typeof personalDetailsSchema>;
export type ResetPasswordFormInput = z.input<typeof resetPasswordSchema>;
export type ResetPasswordFormOutput = z.output<typeof resetPasswordSchema>;

import { z } from 'zod';
import type { personalDetailsSchema } from '~/schemas/settings';

export type PersonalDetailsFormValues = z.infer<typeof personalDetailsSchema>;

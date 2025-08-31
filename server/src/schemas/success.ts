import type { FromSchema } from 'json-schema-to-ts';

export const SuccessResponseSchema = {
  $id: 'SuccessResponseSchema',
  type: 'object',
  additionalProperties: false,
  properties: {
    message: { type: 'string' }
  },
  required: ['message']
} as const;

export type SuccessResponse = FromSchema<typeof SuccessResponseSchema>;

import type { FromSchema } from 'json-schema-to-ts';

export const ErrorResponseSchema = {
  $id: 'ErrorResponseSchema',
  type: 'object',
  additionalProperties: false,
  properties: {
    message: { type: 'string' }
  },
  required: ['message']
} as const;

export type ErrorResponse = FromSchema<typeof ErrorResponseSchema>;

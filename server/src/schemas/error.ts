import type { FromSchema } from 'json-schema-to-ts';

export const ErrorResponseSchema = {
  $id: 'ErrorResponseSchema',
  type: 'object',
  additionalProperties: false,
  properties: {
    message: { type: 'string' },
    code: {
      type: 'string',
      enum: ['INACTIVE_USER', 'USERNAME_EXISTS', 'EMAIL_EXISTS']
    }
  },
  required: ['message']
} as const;

export type ErrorResponse = FromSchema<typeof ErrorResponseSchema>;

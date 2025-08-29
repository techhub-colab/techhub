import type { FromSchema } from 'json-schema-to-ts';

export const UpdateMeRequestSchema = {
  $id: 'UpdateMeRequestSchema',
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
    email: { type: 'string' },
    bio: { type: 'string' }
  },
  additionalProperties: false
} as const;

export type UpdateMeRequest = FromSchema<typeof UpdateMeRequestSchema>;

export const UserResponseSchema = {
  $id: 'UserResponseSchema',
  type: 'object',
  properties: {
    id: { type: 'number' },
    uuid: { type: 'string' },
    username: { type: 'string' },
    email: { type: 'string' },
    isActive: { type: 'boolean' },
    bio: { type: 'string' },
    lastLogin: { type: 'string', format: 'date-time' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' }
  },
  required: ['id', 'uuid', 'username', 'email', 'isActive', 'bio', 'lastLogin', 'createdAt', 'updatedAt'],
  additionalProperties: false
} as const;

export type UserResponse = FromSchema<typeof UserResponseSchema>;

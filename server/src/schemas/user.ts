import { FromSchema } from 'json-schema-to-ts';

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
} as const;

export type UserResponse = FromSchema<typeof UserResponseSchema>;

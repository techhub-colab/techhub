import { getMe } from '@/controllers/user.js';
import { authHook } from '@/hooks/auth.js';
import type { FastifyInstance } from 'fastify';

const userRoutes = (app: FastifyInstance) => {
  app.get('/me', {
    schema: {
      tags: ['Users'],
      response: {
        200: { $ref: 'UserResponseSchema#', description: 'Success' },
        401: { $ref: 'ErrorResponseSchema#', description: 'Invalid access token' },
        403: { $ref: 'ErrorResponseSchema#', description: 'Inactive user' }
      }
    },
    preHandler: authHook,
    handler: getMe
  });
};

export default userRoutes;

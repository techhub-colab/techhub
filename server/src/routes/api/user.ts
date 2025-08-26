import { getMe } from '@/controllers/user.js';
import { authHook } from '@/hooks/auth.js';
import type { FastifyInstance } from 'fastify';

const userRoutes = (app: FastifyInstance) => {
  app.get('/me', {
    schema: {
      tags: ['Users'],
      response: {
        200: { $ref: 'UserResponseSchema#', message: 'Success' },
        401: { $ref: 'ErrorResponseSchema#', message: 'Invalid access token' },
        403: { $ref: 'ErrorResponseSchema#', message: 'Inactive user' }
      }
    },
    preHandler: authHook,
    handler: getMe
  })
};

export default userRoutes;

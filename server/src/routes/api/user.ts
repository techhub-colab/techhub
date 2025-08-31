import { getMe, updateMe } from '@/controllers/user.js';
import { authHook } from '@/hooks/auth.js';
import { saveUserHook } from '@/hooks/user.js';
import type { FastifyInstance } from 'fastify';

const userRoutes = (app: FastifyInstance) => {
  app.get('/me', {
    schema: {
      tags: ['Users'],
      response: {
        200: { $ref: 'UserResponseSchema#', description: 'Success' },
        401: { $ref: 'ErrorResponseSchema#', description: 'Unauthenticated' },
        403: { $ref: 'ErrorResponseSchema#', description: 'Inactive user' }
      }
    },
    preHandler: authHook,
    handler: getMe
  });

  app.patch('/me', {
    schema: {
      tags: ['Users'],
      body: { $ref: 'UpdateMeRequestSchema#' },
      response: {
        200: { $ref: 'UserResponseSchema#', description: 'Success' },
        400: { $ref: 'ErrorResponseSchema#', description: 'Invalid input (username, email, etc.)' },
        401: { $ref: 'ErrorResponseSchema#', description: 'Unauthenticated' },
        409: { $ref: 'ErrorResponseSchema#', description: 'Username or email already taken' }
      }
    },
    preValidation: saveUserHook,
    preHandler: authHook,
    handler: updateMe
  });
};

export default userRoutes;

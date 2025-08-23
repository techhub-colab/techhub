import { login, refreshToken, signup } from '@/controllers/auth.js';
import { saveUserHook } from '@/hooks/user.js';
import { FastifyInstance } from 'fastify';

const authRoutes = (app: FastifyInstance) => {
  app.post('/signup', {
    schema: {
      tags: ['Auth'],
      body: { $ref: 'SignupRequestSchema#' },
      response: {
        201: { $ref: 'UserResponseSchema#', description: 'User created on successful signup' },
        400: { $ref: 'ErrorResponseSchema#', description: 'Ill-formatted input (username, email, etc.)' },
        409: { $ref: 'ErrorResponseSchema#', description: 'Username or email already taken' },
        500: { $ref: 'ErrorResponseSchema#', description: 'Unexpected error' }
      }
    },
    preValidation: saveUserHook,
    handler: signup
  });

  app.post('/login', {
    schema: {
      tags: ['Auth'],
      body: { $ref: 'LoginRequestSchema#' },
      response: {
        200: { $ref: 'LoginResponseSchema#', description: 'Success' },
        401: { $ref: 'ErrorResponseSchema#', description: 'Invalid credentials' },
        500: { $ref: 'ErrorResponseSchema#', description: 'Unexpected error' }
      }
    },
    handler: login
  });

  app.post('/refresh-token', {
    schema: {
      tags: ['Auth'],
      response: {
        200: { $ref: 'RefreshTokenResponseSchema#', description: 'Success' },
        401: { $ref: 'ErrorResponseSchema#', description: 'Session expired or invalid refresh token' },
        500: { $ref: 'ErrorResponseSchema#', description: 'Unexpected error' }
      }
    },
    handler: refreshToken
  });
};

export default authRoutes;

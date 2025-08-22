import { login, refreshToken, signup } from '@/controllers/auth.js';
import { saveUserHook } from '@/hooks/user.js';
import { FastifyInstance } from 'fastify';

const authRoutes = (app: FastifyInstance) => {
  app.post('/signup', {
    schema: {
      body: { $ref: 'SignupRequestSchema#' },
      response: {
        201: { $ref: 'UserResponseSchema#' },
        400: { $ref: 'ErrorResponseSchema#' },
        409: { $ref: 'ErrorResponseSchema#' },
        500: { $ref: 'ErrorResponseSchema#' }
      }
    },
    preValidation: saveUserHook,
    handler: signup
  });

  app.post('/login', {
    schema: {
      body: { $ref: 'LoginRequestSchema#' },
      response: {
        200: { $ref: 'LoginResponseSchema#' },
        400: { $ref: 'ErrorResponseSchema#' },
        401: { $ref: 'ErrorResponseSchema#' },
        500: { $ref: 'ErrorResponseSchema#' }
      }
    },
    handler: login
  });

  app.post('/refresh-token', {
    schema: {
      response: {
        200: { $ref: 'RefreshTokenResponseSchema#' },
        401: { $ref: 'ErrorResponseSchema#' },
        500: { $ref: 'ErrorResponseSchema#' }
      }
    },
    handler: refreshToken
  });
};

export default authRoutes;

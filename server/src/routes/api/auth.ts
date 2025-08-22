import { login, refreshToken, signup } from '@/controllers/auth.js';
import { FastifyInstance } from 'fastify';

const authRoutes = (app: FastifyInstance) => {
  app.post('/signup', {
    handler: signup,
    schema: {
      body: { $ref: 'SignupRequestSchema#' },
      response: {
        200: { $ref: 'UserResponseSchema#' },
        400: { $ref: 'ErrorResponseSchema#' },
        409: { $ref: 'ErrorResponseSchema#' },
        500: { $ref: 'ErrorResponseSchema#' }
      }
    }
  });

  app.post('/login', {
    handler: login,
    schema: {
      body: { $ref: 'LoginRequestSchema#' },
      response: {
        200: { $ref: 'LoginResponseSchema#' },
        400: { $ref: 'ErrorResponseSchema#' },
        401: { $ref: 'ErrorResponseSchema#' },
        500: { $ref: 'ErrorResponseSchema#' }
      }
    }
  });

  app.post('/refresh-token', {
    handler: refreshToken,
    schema: {
      response: {
        200: { $ref: 'RefreshTokenResponseSchema#' },
        401: { $ref: 'ErrorResponseSchema#' },
        500: { $ref: 'ErrorResponseSchema#' }
      }
    }
  });
};

export default authRoutes;

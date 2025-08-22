import {
  LoginRequestSchema,
  LoginResponseSchema,
  RefreshTokenResponseSchema,
  SignupRequestSchema
} from '@/schemas/auth.js';
import { ErrorResponseSchema } from '@/schemas/error.js';
import { UserResponseSchema } from '@/schemas/user.js';
import { FastifyInstance } from 'fastify';

export const addSchemas = (app: FastifyInstance) => {
  // auth
  app.addSchema(SignupRequestSchema);
  app.addSchema(LoginRequestSchema);
  app.addSchema(LoginResponseSchema);
  app.addSchema(RefreshTokenResponseSchema);
  // user
  app.addSchema(UserResponseSchema);
  // error
  app.addSchema(ErrorResponseSchema);
};

import {
  LoginRequestSchema,
  LoginResponseSchema,
  RefreshTokenResponseSchema,
  SignupRequestSchema
} from '@/schemas/auth.js';
import { ErrorResponseSchema } from '@/schemas/error.js';
import { SuccessResponseSchema } from '@/schemas/success.js';
import { UpdateMeRequestSchema, UserResponseSchema } from '@/schemas/user.js';
import type { FastifyInstance } from 'fastify';

export const addSchemas = (app: FastifyInstance) => {
  // auth
  app.addSchema(SignupRequestSchema);
  app.addSchema(LoginRequestSchema);
  app.addSchema(LoginResponseSchema);
  app.addSchema(RefreshTokenResponseSchema);
  // user
  app.addSchema(UpdateMeRequestSchema);
  app.addSchema(UserResponseSchema);
  // success and error
  app.addSchema(SuccessResponseSchema);
  app.addSchema(ErrorResponseSchema);
};

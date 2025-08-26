import type { FromSchema } from 'json-schema-to-ts';

export const SignupRequestSchema = {
  $id: 'SignupRequestSchema',
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
    email: { type: 'string' }
  },
  required: ['username', 'password', 'email'],
  additionalProperties: false
} as const;

export type SignupRequest = FromSchema<typeof SignupRequestSchema>;

export const LoginRequestSchema = {
  $id: 'LoginRequestSchema',
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['username', 'password'],
  additionalProperties: false
} as const;

export type LoginRequest = FromSchema<typeof LoginRequestSchema>;

export const LoginResponseSchema = {
  $id: 'LoginResponseSchema',
  type: 'object',
  properties: {
    accessToken: { type: 'string' },
    user: { $ref: 'UserResponseSchema#' }
  },
  required: ['accessToken', 'user'],
  additionalProperties: false
} as const;

export type LoginResponse = FromSchema<typeof LoginResponseSchema>;

export const RefreshTokenResponseSchema = {
  $id: 'RefreshTokenResponseSchema',
  type: 'object',
  properties: {
    accessToken: { type: 'string' }
  },
  required: ['accessToken']
} as const;

export type RefreshTokenResponse = FromSchema<typeof RefreshTokenResponseSchema>;

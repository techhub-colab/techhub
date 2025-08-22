import { REFRESH_TOKEN_NAME, REFRESH_TOKEN_PATH } from '@/utils/constants.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export const signAccessToken = (userId: number): string => {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET!, { expiresIn: '1h' });
};

export const signRefreshToken = (userId: number): string => {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string): { userId: number } => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET!) as { userId: number };
};

export const verifyRefreshToken = (token: string): { userId: number } => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET!) as { userId: number };
};

export const decodeAccessToken = (token: string): { userId: number } => {
  return jwt.decode(token) as { userId: number };
};

export const getAccessToken = (req: FastifyRequest): string | undefined => {
  const split = req.headers['authorization']?.split(' ');
  if (!split || split[0] !== 'Bearer') {
    return undefined;
  }
  return split[1];
};

export const getRefreshToken = (req: FastifyRequest): string | undefined => {
  return req.cookies[REFRESH_TOKEN_NAME];
};

export const setRefreshToken = (res: FastifyReply, refreshToken: string) => {
  res.setCookie(REFRESH_TOKEN_NAME, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: REFRESH_TOKEN_PATH,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

export const clearRefreshToken = (res: FastifyReply) => {
  res.clearCookie(REFRESH_TOKEN_NAME, { path: REFRESH_TOKEN_PATH });
};

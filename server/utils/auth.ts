import type { Request, Response } from 'express';
import type { User } from '../generated/prisma/client';
import { REFRESH_TOKEN_NAME, REFRESH_TOKEN_PATH } from './constants';
import jwt, { type JwtPayload } from 'jsonwebtoken';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export const signAccessToken = (userId: number): string => {
  if (!ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET is not defined in env');
  }
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
};

export const signRefreshToken = (userId: number): string => {
  if (!REFRESH_TOKEN_SECRET) {
    throw new Error('REFRESH_TOKEN_SECRET is not defined in env');
  }
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  if (!ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET is not defined in env');
  }

  const jwtPayload = jwt.verify(token, ACCESS_TOKEN_SECRET);
  if (typeof jwtPayload !== 'object') {
    throw new Error('JWT payload is not an object: ' + jwtPayload);
  }

  return jwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  if (!REFRESH_TOKEN_SECRET) {
    throw new Error('REFRESH_TOKEN_SECRET is not defined in env');
  }

  const jwtPayload = jwt.verify(token, REFRESH_TOKEN_SECRET);
  if (typeof jwtPayload !== 'object') {
    throw new Error('JWT payload is not an object: ' + jwtPayload);
  }

  return jwtPayload;
};

export const decodeAccessToken = (token: string): JwtPayload => {
  const jwtPayload = jwt.decode(token);
  if (typeof jwtPayload !== 'object' || !jwtPayload) {
    throw new Error('JWT payload is not an object: ' + jwtPayload);
  }
  return jwtPayload;
};

export const getAccessToken = (req: Request): string => {
  const accessToken = req.header('Authorization')?.split(' ')[1];
  if (!accessToken) {
    throw new Error('No access token found in Authorization header');
  }
  return accessToken;
};

export const getRefreshToken = (req: Request): string => {
  return req.cookies[REFRESH_TOKEN_NAME];
};

export const setRefreshToken = (res: Response, refreshToken: string) => {
  res.cookie(REFRESH_TOKEN_NAME, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: REFRESH_TOKEN_PATH,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

export const clearRefreshToken = (res: Response) => {
  res.clearCookie(REFRESH_TOKEN_NAME, { path: REFRESH_TOKEN_PATH });
};

// Reject authentication of inactive users
export const verifyUser = (req: Request, res: Response, user: User) => {
  // unauthorize if the user is inactive or removed
  if (!user?.isActive) {
    // instruct to clear refresh token in browser
    clearRefreshToken(res);
    return false;
  }
  req.user = user;
  return true;
};

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import type { Request, Response } from 'express';
import {
  clearRefreshToken,
  getRefreshToken,
  setRefreshToken,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} from 'server/utils/auth';
import { EMAIL_EXISTS, INVALID_CREDENTIALS, SESSION_EXPIRED, USERNAME_EXISTS } from '../utils/constants';
import { comparePassword, hashPassword } from '../utils/password';
import prisma from '../utils/prisma';
import { errorResponse, successResponse } from '../utils/response';
import { isValidEmail, isValidPassword, isValidUsername } from '../utils/validation';

export const refreshToken = async (req: Request, res: Response) => {
  let refreshToken = getRefreshToken(req);
  if (!refreshToken) {
    return errorResponse(res, 401, 'No refresh token provided', SESSION_EXPIRED);
  }

  try {
    const { userId } = verifyRefreshToken(refreshToken);
    const accessToken = signAccessToken(userId);
    refreshToken = signRefreshToken(userId);
    setRefreshToken(res, refreshToken);
    return successResponse(res, 200, { accessToken });

  } catch (err) {
    // clear the refresh token in cookies anyway on error
    clearRefreshToken(res);

    if (err instanceof Error) {
      // if the refresh token expired
      if (err.name === 'TokenExpiredError') {
        return errorResponse(res, 401, 'Session expired', SESSION_EXPIRED);
      }
      // most likely an invalid signature
      if (err.name === 'JsonWebTokenError') {
        return errorResponse(res, 401, 'Invalid refresh token', SESSION_EXPIRED);
      }
    }

    console.error(err);
    return errorResponse(res, 500, 'Unexpected error');
  }
};

export const signup = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  if (!isValidUsername(username) || !isValidPassword(password) || !isValidEmail(email)) {
    return errorResponse(res, 400, 'Bad request');
  }

  try {
    // For now the system can have only two users
    // Will remove this constraint in future for system functionalities
    if (await prisma.user.count() >= 2) {
      return errorResponse(res, 403, 'Forbidden');
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email
      }
    });
    return successResponse(res, 201, user, 'Signed up successfully!');

  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002' && Array.isArray(err.meta?.target)) {
      // Catch unique constraint error
      const target = err.meta?.target;
      if (target.includes('username')) {
        return errorResponse(res, 409, 'Username already exists', USERNAME_EXISTS);
      }
      if (target.includes('email')) {
        return errorResponse(res, 409, 'Email already registered', EMAIL_EXISTS);
      }
    }

    console.error(err);
    return errorResponse(res, 500, 'Error signing up');
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || !user.isActive) {
      return errorResponse(res, 401, 'Invalid credentials', INVALID_CREDENTIALS);
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return errorResponse(res, 401, 'Invalid credentials', INVALID_CREDENTIALS);
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLogin: new Date(),
        updatedAt: user.updatedAt // prevent the update of updatedAt for login
      }
    });

    const accessToken = signAccessToken(user.id);
    const refreshToken = signRefreshToken(user.id);
    setRefreshToken(res, refreshToken);

    return successResponse(res, 200, { accessToken, user: updatedUser });

  } catch (err) {
    console.error(err);
    return errorResponse(res, 500, 'Unexpected error');
  }
};

export const logout = async (req: Request, res: Response) => {
  clearRefreshToken(res);
  return successResponse(res, 200, null, 'Logged out');
};
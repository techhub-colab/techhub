import { Prisma } from '@/generated/prisma/client.js';
import type { LoginFormValues, SignupRequest } from '@/schemas/auth.js';
import {
  clearRefreshToken,
  getRefreshToken,
  setRefreshToken,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} from '@/utils/auth.js';
import { comparePassword } from '@/utils/password.js';
import prisma from '@/utils/prisma.js';
import type { FastifyReply, FastifyRequest } from 'fastify';

export const signup = async (req: FastifyRequest<{ Body: SignupRequest }>, res: FastifyReply) => {
  const { username, password, email } = req.body;

  try {
    // For now the system can have only two users
    // Will remove this constraint in future for system functionalities
    if (await prisma.user.count() >= 2) {
      return res.status(403).send({ message: 'Forbidden' });
    }

    const user = await prisma.user.create({
      data: { username, password, email }
    });

    return res.status(201).send(user);

  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002' && Array.isArray(err.meta?.target)) {
      // Catch unique constraint error
      const target = err.meta?.target;
      if (target.includes('username')) {
        return res.status(409).send({
          message: 'Username already taken',
          code: 'USERNAME_EXISTS'
        });
      }
      if (target.includes('email')) {
        return res.status(409).send({
          message: 'Email already registered',
          code: 'EMAIL_EXISTS'
        });
      }
    }

    throw err;
  }
};

export const login = async (req: FastifyRequest<{ Body: LoginFormValues }>, res: FastifyReply) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { username },
    omit: { password: false }
  });

  if (!user || !user.isActive || user.username !== username) { // force case-sensitive username comparison
    return res.status(401).send({ message: 'Invalid credentials' });
  }

  const match = await comparePassword(password, user.password);
  if (!match) {
    return res.status(401).send({ message: 'Invalid credentials' });
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

  return { accessToken, user: updatedUser };
};

export const logout = async (req: FastifyRequest, res: FastifyReply) => {
  clearRefreshToken(res);
  return { message: 'Successfully logged out' };
};

export const refreshToken = async (req: FastifyRequest, res: FastifyReply) => {
  let refreshToken = getRefreshToken(req);
  if (!refreshToken) {
    return res.status(401).send({ message: 'Invalid or empty refresh token' });
  }

  try {
    const { userId } = verifyRefreshToken(refreshToken);
    const accessToken = signAccessToken(userId);
    refreshToken = signRefreshToken(userId);
    setRefreshToken(res, refreshToken);
    return { accessToken };

  } catch (err) {
    // clear the refresh token in cookies anyway on error
    clearRefreshToken(res);

    if (err instanceof Error) {
      // if the refresh token expired
      if (err.name === 'TokenExpiredError') {
        return res.status(401).send({ message: 'Session expired' });
      }
      // most likely an invalid signature
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).send({ message: 'Invalid refresh token' });
      }

      throw err;
    }
  }
};

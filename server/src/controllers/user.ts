import { Prisma } from '@/generated/prisma/client.js';
import type { UpdateMeRequest } from '@/schemas/user.js';
import prisma from '@/utils/prisma.js';
import { isValidPassword } from '@/utils/validation.js';
import type { FastifyReply, FastifyRequest } from 'fastify';

export const getMe = async (req: FastifyRequest) => {
  return req.user;
};

export const updateMe = async (req: FastifyRequest<{ Body: UpdateMeRequest }>, res: FastifyReply) => {
  // Temporarily disable Visitor from changing password
  if (req.body.password && req.body.username === 'Visitor') {
    return res.status(403).send({ message: 'Forbidden' });
  }

  // Validate password
  if (req.body.password && !isValidPassword(req.body.password)) {
    return res.status(400).send({ message: 'Invalid password' });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: req.body
    });

    return updatedUser;

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

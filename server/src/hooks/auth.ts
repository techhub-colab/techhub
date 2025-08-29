import { getAccessToken, verifyAccessToken, verifyUser } from '@/utils/auth.js';
import prisma from '@/utils/prisma.js';
import type { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

export const authHook = async (req: FastifyRequest, res: FastifyReply) => {
  const accessToken = getAccessToken(req);
  if (!accessToken) {
    return res.status(401).send({ message: 'Invalid or empty access token' });
  }

  let jwtClaims;
  try {
    jwtClaims = verifyAccessToken(accessToken);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError && err.name === 'TokenExpiredError') {
      return res.status(401).send({ message: 'Session expired' });
    } else {
      req.log.error(err);
      return res.status(401).send({ message: 'Invalid access token' });
    }
  }

  const user = await prisma.user.findUnique({ where: { id: jwtClaims.userId } });
  if (!verifyUser(req, res, user)) {
    return res.status(403).send({ message: 'Forbidden' });
  }

  return;
};

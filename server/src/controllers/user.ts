import type { FastifyRequest } from 'fastify';

export const getMe = async (req: FastifyRequest) => {
  return req.user;
};

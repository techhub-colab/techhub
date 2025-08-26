import authRoutes from '@/routes/api/auth.js';
import userRoutes from '@/routes/api/user.js';
import { FastifyInstance } from 'fastify';

export const apiRoutes = (app: FastifyInstance) => {
  app.register(authRoutes, { prefix: '/auth' });
  app.register(userRoutes, { prefix: '/users' });
};

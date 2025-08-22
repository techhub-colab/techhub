import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

const isProduction = process.env.NODE_ENV === 'production';

// Global app error handler
export const appErrorHandler = (err: FastifyError, req: FastifyRequest, res: FastifyReply) => {
  if (!isProduction) console.error(err);
  req.log.error(err);

  if (err.statusCode === 400) {
    return res.status(err.statusCode).send({ message: 'Bad request' });
  } else {
    return res.status(err.statusCode ?? 500).send({ message: 'Unexpected error' });
  }
};

import 'dotenv/config';
import { apiRoutes } from '@/routes/index.js';
import { addSchemas } from '@/schemas/index.js';
import cookie from '@fastify/cookie';
import Fastify from 'fastify';

const isProduction = process.env.NODE_ENV === 'production';

const app = Fastify({
  logger: true
});

try {
  addSchemas(app);

  app.register(cookie);

  app.setErrorHandler((err, req, res) => {
    if (!isProduction) {
      console.error(err);
    }
    res.log.error(err);

    if (err.statusCode === 400) {
      return res.status(err.statusCode).send({ message: 'Bad request' });
    } else {
      return res.status(err.statusCode ?? 500).send({ message: 'Unexpected error' });
    }
  });

  app.register(apiRoutes, { prefix: '/api' });

  await app.listen({ port: 3000 });

} catch (err) {
  app.log.error(err);
  process.exit(1);
}

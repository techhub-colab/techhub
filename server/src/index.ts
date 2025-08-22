import 'dotenv/config';
import { apiRoutes } from '@/routes/index.js';
import { addSchemas } from '@/schemas/index.js';
import { appErrorHandler } from '@/utils/error.js';
import cookie from '@fastify/cookie';
import Fastify from 'fastify';

const { NODE_ENV, PORT } = process.env;
const isProduction = NODE_ENV === 'production';

const app = Fastify({
  logger: {
    level: isProduction ? 'info' : 'debug'
  }
});

app.register(cookie);
addSchemas(app);
app.setErrorHandler(appErrorHandler);
app.register(apiRoutes, { prefix: '/api' });

app.listen({ port: Number(PORT) || 3000 }, (err, _) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});

import type { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import type { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

const { PORT } = process.env;

export const swaggerOptions: FastifyDynamicSwaggerOptions = {
  swagger: {
    info: {
      title: 'TechHub BFF',
      description: 'API endpoints for Techhub website',
      version: '0.0.0'
    },
    host: `http://localhost:${PORT}`,
    basePath: '/api',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'Auth' }
    ]
  }
};

export const swaggerUiOptions: FastifySwaggerUiOptions = {
  routePrefix: '/_docs'
};

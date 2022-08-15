import fastify, { FastifyInstance } from 'fastify';

import { getConfig } from '~/config/config';

const fastifyInstance = fastify({
  logger: {
    serializers: {
      req: (request) => {
        return {
          method: request.method,
          url: request.url,
          remoteAddress: request.ip,
        };
      },
      res: (response) => {
        return { statusCode: response.statusCode };
      },
    },
  },
});

export const getFastifyInstance = () => fastifyInstance;

export const listenFastifyServer = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.listen({
    host: '::',
    port: getConfig().webServerPort,
  });

  return fastifyInstance;
};

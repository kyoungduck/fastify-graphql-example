import { FastifyInstance } from 'fastify';

import { healthCheckController } from './health-check';
import { graphqlToolsController } from './playground';

export const setupHttpControllers = (fastifyInstance: FastifyInstance) => {
  const controllers: Array<(fastifyInstance: FastifyInstance) => void> = [
    healthCheckController,
    graphqlToolsController,
  ];

  controllers.map((controller) => {
    controller(fastifyInstance);
  });
};

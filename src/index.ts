import { logger } from '@lib/logger';

import { loadConfig } from './config/config';
import { setupGraphqlServer } from './graphql/setup-server';
import { setupHttpControllers } from './http-controller/setup-http-controller';
import {
  getFastifyInstance,
  listenFastifyServer,
} from './http-server/init-server';

(async () => {
  await loadConfig();
  const fastifyInstance = getFastifyInstance();
  setupHttpControllers(fastifyInstance);
  setupGraphqlServer(fastifyInstance);

  await listenFastifyServer(fastifyInstance);
})()
  .then(() => {})
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });

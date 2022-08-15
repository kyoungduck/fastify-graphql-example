import { envelop, useLogger, useSchema } from '@envelop/core';
import { FastifyInstance } from 'fastify';
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL,
} from 'graphql-helix';

import { getSchema } from './schema';

const getEnveloped = envelop({
  plugins: [
    useSchema(getSchema()),
    useLogger({
      logFn: async (eventName, args) => {
        if (eventName === 'execute-end') {
          const action = args?.args?.contextValue?.operation?.operation;
          const method =
            args?.args?.contextValue?.operation?.name?.value ??
            args?.args?.contextValue?.operation?.loc?.source?.body;

          const now = new Date();

          args?.args?.contextValue.req.log.info(`[${action}] ${method}`);
        }
      },
    }),
  ],
});

export const setupGraphqlServer = async (fastify: FastifyInstance) => {
  fastify.route({
    method: ['GET', 'POST'],
    url: '/graphql',
    async handler(req, res) {
      const { parse, validate, contextFactory, execute, schema } = getEnveloped(
        { req },
      );

      const request = {
        body: req.body,
        headers: req.headers,
        method: req.method,
        query: req.query,
      };

      if (shouldRenderGraphiQL(request)) {
        res.type('text/html');
        res.send(renderGraphiQL({}));
      } else {
        const request = {
          body: req.body,
          headers: req.headers,
          method: req.method,
          query: req.query,
        };
        const { operationName, query, variables } =
          getGraphQLParameters(request);
        const result = await processRequest({
          operationName,
          query,
          variables,
          request,
          schema,
          parse,
          validate,
          contextFactory,
          execute,
        });

        sendResult(result, res.raw);
      }
    },
  });
};

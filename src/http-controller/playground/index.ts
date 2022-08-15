import { FastifyInstance } from 'fastify';
import { renderPlaygroundPage } from 'graphql-playground-html';
import { renderVoyagerPage } from 'graphql-voyager/middleware';

export const graphqlToolsController = (fastifyInstance: FastifyInstance) => {
  fastifyInstance.get('/playground', (request, reply) => {
    const renderPage = renderPlaygroundPage({
      endpoint: '/graphql',
    });

    reply.type('text/html');
    reply.send(renderPage);
  });

  fastifyInstance.get('/voyager', (request, reply) => {
    const renderPage = renderVoyagerPage({
      endpointUrl: '/graphql',
    });

    reply.type('text/html');
    reply.send(renderPage);
  });
};

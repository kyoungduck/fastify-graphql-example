import { FastifyInstance } from "fastify";

export const healthCheckController = (fastifyInstance: FastifyInstance) => {
  fastifyInstance.get("/health-check", (request, reply) => {
    reply.send("OK");
  });
};

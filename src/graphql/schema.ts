import { GraphQLSchema } from "graphql";

import { makeExecutableSchema } from "@graphql-tools/schema";

import { resolvers } from "./resolver";

import typeDefs from "./__generated__/typeDefs";

let schema: GraphQLSchema | null = null;

export function getSchema() {
  if (schema) {
    return schema;
  }

  schema = makeExecutableSchema({
    typeDefs,
    resolvers: resolvers,
    inheritResolversFromInterfaces: true,
  });

  return schema;
}

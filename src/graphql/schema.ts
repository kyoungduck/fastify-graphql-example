import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLSchema } from "graphql";

import typeDefs from "./__generated__/typeDefs";
import { resolvers } from "./resolver";

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

import { PingQuery } from "./resolver/Ping/PingQuery";
import { Resolvers } from "./__generated__/typings";

export const resolvers: Resolvers = {
  Query: {
    ...PingQuery,
  },
};

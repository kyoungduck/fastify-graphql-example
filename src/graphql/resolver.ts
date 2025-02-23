import { Resolvers } from "./__generated__/typings";
import { PingQuery } from "./resolver/Ping/PingQuery";

export const resolvers: Resolvers = {
  Query: {
    ...PingQuery,
  },
};

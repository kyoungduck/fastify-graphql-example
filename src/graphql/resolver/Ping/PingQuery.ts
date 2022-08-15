import { Resolvers } from "~/graphql/__generated__/typings";

export const PingQuery: Resolvers["Query"] = {
  ping: () => "pong",
};

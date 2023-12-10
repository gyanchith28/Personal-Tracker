import { ApolloServer } from "@apollo/server";
import { User } from "./user";

async function createApolloGraphqlServer() {
  const gqlserver = new ApolloServer({
    typeDefs: `
            type Query {
              ${User.queries},
            }
            type Mutation {
              ${User.mutations}
            }
        `, //Schema
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });

  await gqlserver.start();

  return gqlserver;
}

export default createApolloGraphqlServer;

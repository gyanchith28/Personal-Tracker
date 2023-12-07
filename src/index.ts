import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT || 8000);

  app.use(express.json());

  // Create Graphql Server
  const gqlserver = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String,
            say(name: String): String,
        }
    `, //Schema
    resolvers: {
      Query: {
        hello: () => `Hey there, I am a graphql server.`,
        say: (_, { name }: { name: string }) => `Hey ${name}, How are you`,
      },
    },
  });

  await gqlserver.start();

  app.use("/graphql", expressMiddleware(gqlserver));

  app.get("/", (req, res) => {
    res.json({ message: " server is up and running" });
  });

  app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
}

init();

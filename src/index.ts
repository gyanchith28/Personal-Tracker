import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphqlServer from "./graphql";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT || 8000);

  app.use(express.json());

  app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()));

  app.get("/", (req, res) => {
    res.json({ message: " server is up and running" });
  });

  app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
}

init();

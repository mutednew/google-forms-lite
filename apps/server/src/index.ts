import express from "express";
import cors from "cors";
import { readFileSync } from "fs";
import { join } from "path";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5"
import { resolvers } from "./resolvers";

const typeDefs = readFileSync(
    join(__dirname, "schema.graphql"),
    "utf8"
);

(async function bootstrap() {
    const PORT = process.env.PORT || 7000;
    const app = express();

    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    app.use(
        "/graphql",
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(server)
    );

    app.listen(PORT, () => {
        console.log("Server is running on port " + PORT);
    });
})();
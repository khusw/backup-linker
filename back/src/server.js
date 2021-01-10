import dotenv from "dotenv";
dotenv.config();
import { GraphQLServer, PubSub } from "graphql-yoga";
import morgan from "morgan";
import "./passport";
import { authenticateJWT } from "./passport";
import schema from "./schema";

const PORT = process.env.PORT;

const pubsub = new PubSub();

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, pubsub }),
});

server.express.use(morgan("dev"));
server.express.use(authenticateJWT);

server.start(() => console.log(`server is running : http://localhost:${PORT}`));

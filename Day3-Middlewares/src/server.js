import express from "express";
import listEndpoints from "express-list-endpoints";
import blogsRouter from "./BlogPosts/index.js";
import cors from "cors";
import {
  badRequestHandler,
  notFoundHandler,
  unauthorizedHandler,
  genericErrorHandler
} from "./errorHandlers.js";

const server = express();

const port = 3001;

server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

server.use(express.json());

server.use("/blogPosts", blogsRouter);

server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(unauthorizedHandler);
server.use(genericErrorHandler);

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`Server is running on port ${port}`);
});

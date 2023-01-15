import express from "express";
import listEndpoints from "express-list-endpoints";

import {
  badRequestHandler,
  notFoundHandler,
  unauthorizedHandler,
  genericErrorHandler
} from "./errorHandlers";

const server = express();

const port = 3001;

server.use(express.json());

server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(unauthorizedHandler);
server.use(genericErrorHandler);

server.listen(port, () => {
  console.log("Server is running on port: ", port);
  console.table(listEndpoints(server));
});

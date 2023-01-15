import express from "express";
import listEndpoints from "express-list-endpoints";
import productsRouter from "./api/products/index.js";
import filesRouter from "./api/files/index.js";
import {
  badRequestHandler,
  notFoundHandler,
  unauthorizedHandler,
  genericErrorHandler
} from "./errorhandlers.js";

const server = express();

const port = 3001;

server.use(express.json());

server.use("/products", productsRouter);
server.use("/files", filesRouter);

server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(unauthorizedHandler);
server.use(genericErrorHandler);

server.listen(port, () => {
  console.log("Server is running on port: ", port);
  console.table(listEndpoints(server));
});

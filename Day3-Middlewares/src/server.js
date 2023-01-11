import express from "express";
import listEndpoints from "express-list-endpoints";
import blogsRouter from "./BlogPosts/index.js";
import cors from "cors";

const server = express();

const port = 3007;

server.use(cors());

server.use(express.json());

server.use("/blogPosts", blogsRouter);

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`Server is running on port ${port}`);
});

import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const blogsRouter = express.Router();

console.log("CURRENTS FILE URL:", import.meta.url);
console.log("CURRENTS FILE PATH:", fileURLToPath(import.meta.url));
console.log("PARENT FOLDER PATH: ", dirname(fileURLToPath(import.meta.url)));
console.log(
  "TARGET FILE PATH: ",
  join(dirname(fileURLToPath(import.meta.url)), "Posts.json")
);

const blogsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "Posts.json"
);

//Get all blogs --------------

blogsRouter.get("/", (req, res) => {
  const fileContentAsABuffer = fs.readFileSync(blogsJSONPath);
  const blogs = JSON.parse(fileContentAsABuffer);
  res.send(blogs);
});

//Get a single blog --------------

blogsRouter.get("/:id", (req, res) => {
  const blogId = req.params.id;
  console.log("BLOG ID:", blogId);
  const blogs = JSON.parse(fs.readFileSync(blogsJSONPath));
  const blog = blogs.find((blog) => blog.id === blogId);
  res.send(blog);
});

//Post a new blog --------------

blogsRouter.post("/", (req, res) => {
  console.log("REQ BODY:", req.body);

  const newBlog = {
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: uniqid()
  };

  const blogs = JSON.parse(fs.readFileSync(blogsJSONPath));
  blogs.push(newBlog);
  fs.writeFileSync(blogsJSONPath, JSON.stringify(blogs));
  res.status(201).send({ id: newBlog.id });
});

//Edit a single blog --------------

blogsRouter.put("/:id", (req, res) => {
  const blogs = JSON.parse(fs.readFileSync(blogsJSONPath));
  const index = blogs.findIndex((blog) => blog.id === req.params.id);
  const oldBlog = blogs[index];
  const newBlog = { ...oldBlog, ...req.body, updatedAt: new Date() };
  blogs[index] = newBlog;

  fs.writeFileSync(blogsJSONPath, JSON.stringify(blogs));

  res.send(newBlog);
});

//Delete a single blog --------------

blogsRouter.delete("/:id", (req, res) => {
  const blogs = JSON.parse(fs.readFileSync(blogsJSONPath));
  const remainingBlogs = blogs.filter((blog) => blog.id !== req.params.id);
  fs.writeFileSync(blogsJSONPath, JSON.stringify(remainingBlogs));
  res.send("Deleted!");
});

//Get all posts from a single author --------------

blogsRouter.get("/", (req, res) => {
  const blogs = JSON.parse(fs.readFileSync(blogsJSONPath));
  const authorName = req.query.author;
  const blog = blogs.filter((blog) => blog.author.name === authorName);
  if (blog.length > 0) {
    res.send(blog);
  } else {
    res.send("No blog found!");
  }
});

//Get a post that contains a specific word --------------

// blogsRouter.get("/:id/posts/:word", (req, res) => {
//   const blogs = JSON.parse(fs.readFileSync(blogsJSONPath));
//   const blog = blogs.filter((blog) => blog.id === req.params.id);

export default blogsRouter;

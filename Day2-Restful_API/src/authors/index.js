import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const authorsRouter = express.Router();

console.log("CURRENTS FILE URL:", import.meta.url);
console.log("CURRENTS FILE PATH:", fileURLToPath(import.meta.url));
console.log("PARENT FOLDER PATH: ", dirname(fileURLToPath(import.meta.url)));
console.log(
  "TARGET FILE PATH: ",
  join(dirname(fileURLToPath(import.meta.url)), "authors.json")
);

const authorsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "authors.json"
);

//Post a new author --------------

authorsRouter.post("/", (req, res) => {
  console.log("REQ BODY:", req.body);

  const newAuthor = {
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: uniqid()
  };

  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));

  authors.push(newAuthor);

  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors));

  res.status(201).send({ id: newAuthor.id });
});

// Get all authors --------------

authorsRouter.get("/", (req, res) => {
  const fileContentAsABuffer = fs.readFileSync(authorsJSONPath);
  const authors = JSON.parse(fileContentAsABuffer);
  res.send(authors);
});

// Get a single author --------------

authorsRouter.get("/:id", (req, res) => {
  const authorId = req.params.id;
  console.log("AUTHOR ID:", authorId);
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));
  const author = authors.find((author) => author.id === authorId);
  console.log(author);
  res.send(author);
});

// Edit a single author --------------

authorsRouter.put("/:id", (req, res) => {
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));
  const index = authors.findIndex((author) => author.id === req.params.id);
  const oldAuthor = authors[index];
  const newAuthor = { ...oldAuthor, ...req.body, updatedAt: new Date() };
  authors[index] = newAuthor;

  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors));

  res.send(newAuthor);
});

// Delete a single author --------------

authorsRouter.delete("/:id", (req, res) => {
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));
  const remainingAuthors = authors.filter(
    (author) => author.id !== req.params.id
  );
  fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingAuthors));
  res.send("Deleted!");
});

//Check if another author has the same email --------------
// Using filter incase more than 1 author has the same email
authorsRouter.get("/checkEmail/:email", (req, res) => {
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));
  const author = authors.filter((author) => author.email === req.params.email);
  if (author) {
    res.send(author);
  } else {
    res.send("No author with this email");
  }
});

export default authorsRouter;

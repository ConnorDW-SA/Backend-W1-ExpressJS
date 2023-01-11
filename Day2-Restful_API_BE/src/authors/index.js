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

export default authorsRouter;

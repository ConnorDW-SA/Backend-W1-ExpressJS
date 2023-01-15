import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs-extra";

const { readJSON, writeJSON, writeFile } = fs;

const dataFolderPath = join(process.cwd(), "./public/images/products");

const productsFilePath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/products.json"
);

console.log(productsFilePath);

export const getProducts = () => readJSON(productsFilePath);
export const writeProducts = (products) =>
  writeJSON(productsFilePath, products);
export const savePictures = (fileName, contentAsBuffer) =>
  writeFile(join(dataFolderPath, fileName), contentAsBuffer);

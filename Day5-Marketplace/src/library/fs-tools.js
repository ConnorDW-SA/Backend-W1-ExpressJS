import { fileUrlToPath } from "url";
import { dirname, join } from "path";
import fs from "fs-extra";

const { readJSON, writeJSON, writeFile } = fs;

const dataFolderPath = join(process.cwd(), "./public/images/products");

const productsFilePath = joim(
  dirname(fileUrlToPath(import.meta.url)),
  "../data/products.json"
);

export const getProducts = async () => await readJSON(productsFilePath);
export const writeProducts = (products) =>
  writeJSON(productsFilePath, products);
export const savePictures = (fileName, contentAsBuffer) =>
  writeFile(join(dataFolderPath, fileName), contentAsBuffer);

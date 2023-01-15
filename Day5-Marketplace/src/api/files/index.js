import express from "express";
import multer from "multer";
import { extname } from "path";
import {
  savePictures,
  getProducts,
  writeProducts
} from "../../library/fs-tools.js";

const filesRouter = express.Router();

filesRouter.post(
  "/:id/upload",
  multer().single("image"),
  async (req, res, next) => {
    try {
      const originalName = extname(req.file.originalname);
      const fileName = req.params.id + originalName;

      await savePictures(fileName, req.file.buffer);

      const url = `http://localhost:3001/images/products/${fileName}`;

      const products = await getProducts();

      const product = products.find((p) => p._id === req.params.id);
      if (product !== -1) {
        const old = products[product];
        const updated = {
          ...old,
          imageUrl: url,
          updatedAt: new Date()
        };
        products[product] = updated;
        await writeProducts(products);
      }
      res.send("Successfully uploaded");
    } catch (error) {
      next(error);
    }
  }
);

export default filesRouter;
//

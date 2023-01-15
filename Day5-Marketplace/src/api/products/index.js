import express from "express";
import { getProducts, writeProducts } from "../../library/fs-tools.js";
import httpErrors from "http-errors";
import { validateProduct, validateReview, validate } from "./validator.js";
const { notFound, badRequest, Unauthorized } = httpErrors;

const productsRouter = express.Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:id", async (req, res, next) => {
  try {
    const products = await getProducts();
    const product = products.find((p) => p._id === req.params.id);
    if (product) {
      res.send(product);
    } else {
      next(notFound("Product not found"));
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.post("/", validateProduct, validate, async (req, res, next) => {
  try {
    const products = await getProducts();
    const newProduct = { ...req.body, _id: uniqid(), createdAt: new Date() };
    products.push(newProduct);
    await writeProducts(products);
    res.status(201).send({ _id: newProduct._id });
  } catch (error) {
    next(error);
  }
});

productsRouter.put(
  "/:id",
  validateProduct,
  validate,
  async (req, res, next) => {
    try {
      const products = await getProducts();
      const remainingProducts = products.filter((p) => p._id !== req.params.id);
      const modifiedProduct = { ...req.body, _id: req.params.id };
      remainingProducts.push(modifiedProduct);
      await writeProducts(remainingProducts);
      res.send(modifiedProduct);
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.delete("/:id", async (req, res, next) => {
  try {
    const products = await getProducts();
    const remainingProducts = products.filter((p) => p._id !== req.params.id);
    await writeProducts(remainingProducts);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

productsRouter.post(
  "/:id/reviews",
  validateReview,
  validate,
  async (req, res, next) => {
    try {
      const products = await getProducts();
      const product = products.find((p) => p._id === req.params.id);
      if (product) {
        const newReview = { ...req.body, _id: uniqid(), createdAt: new Date() };
        product.reviews.push(newReview);
        await writeProducts(products);
        res.status(201).send({ _id: newReview._id });
      } else {
        next(notFound("Product not found"));
      }
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.put(
  "/:id/reviews/:reviewId",
  validateReview,
  validate,
  async (req, res, next) => {
    try {
      const products = await getProducts();
      const product = products.find((p) => p._id === req.params.id);
      if (product) {
        const remainingReviews = product.reviews.filter(
          (r) => r._id !== req.params.reviewId
        );
        const modifiedReview = { ...req.body, _id: req.params.reviewId };
        remainingReviews.push(modifiedReview);
        product.reviews = remainingReviews;
        await writeProducts(products);
        res.send(modifiedReview);
      } else {
        next(notFound("Product not found"));
      }
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.delete("/:id/reviews/:reviewId", async (req, res, next) => {
  try {
    const products = await getProducts();
    const product = products.find((p) => p._id === req.params.id);
    if (product) {
      const remainingReviews = product.reviews.filter(
        (r) => r._id !== req.params.reviewId
      );
      product.reviews = remainingReviews;
      await writeProducts(products);
      res.status(204).send();
    } else {
      next(notFound("Product not found"));
    }
  } catch (error) {
    next(error);
  }
});

export default productsRouter;

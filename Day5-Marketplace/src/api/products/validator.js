import { checkSchema, validationResult } from "express-validator";
import createError from "http-errors";

const productSchema = {
  name: {
    in: ["body"],
    isString: {
      errorMessage: "Name should be a string"
    }
  },
  description: {
    in: ["body"],
    isString: {
      errorMessage: "Description should be a string"
    }
  },
  brand: {
    in: ["body"],
    isString: {
      errorMessage: "Brand should be a string"
    }
  },
  imageUrl: {
    in: ["body"],
    isString: {
      errorMessage: "Image URL should be a string"
    }
  },
  price: {
    in: ["body"],
    isNumeric: {
      errorMessage: "Price should be a number"
    }
  },
  category: {
    in: ["body"],
    isString: {
      errorMessage: "Category should be a string"
    }
  }
};

export const validateProduct = checkSchema(productSchema);

const reviewSchema = {
  comment: {
    in: ["body"],
    isString: {
      errorMessage: "Comment should be a string"
    }
  },
  rate: {
    in: ["body"],
    isNumeric: {
      errorMessage: "Rate should be a number"
    }
  }
};

export const validateReview = checkSchema(reviewSchema);

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(
      createError(400, {
        errorsList: errors.array(),
        message: "Validation Error"
      })
    );
  } else {
    next();
  }
};

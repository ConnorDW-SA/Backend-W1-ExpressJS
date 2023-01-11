import { checkSchema, validationResult } from "express-validator";
import createHttpError from "http-errors";

const blogPostSchema = {
  title: {
    in: ["body"],
    exists: {
      errorMessage: "title is a required field"
    }
  },
  category: {
    in: ["body"],
    exists: {
      errorMessage: "categiry is a required field"
    }
  }
};

export const checkPostSchema = checkSchema(blogPostSchema);

export const triggerBadRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(
      createHttpError(400, "Error during post validation", {
        errorsList: errors.array
      })
    );
  } else {
    next();
  }
};

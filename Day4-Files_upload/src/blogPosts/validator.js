import { checkSchema, validationResult } from "express-validator";
import createHttpError from "http-errors";

const WebAPISchema = {
  title: {
    in: ["body"],
    exists: {
      errorMessage: "Please upload avatar"
    }
  },
  category: {
    in: ["body"],
    exists: {
      errorMessage: "Please upload blog post cover"
    }
  }
};

export const checkAPISchema = checkSchema(WebAPISchema);

export const triggerBadRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(
      createHttpError(400, "Error during API validation", {
        errorsList: errors.array
      })
    );
  } else {
    next();
  }
};

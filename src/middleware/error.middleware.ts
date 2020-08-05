import HttpException, { ValidationException } from "../common/http-exception";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.statusCode || 500;
  const message =
    error.message || "It's not you. It's us. We are having some problems.";

  if (error instanceof ValidationException) {
    response.status(status).json({
      status: "validation error",
      statusCode: status,
      message: message,
      errors: error.errors,
    });
  } else {
    response.status(status).json({
      status: "error",
      statusCode: status,
      message: message,
    });
  }
};

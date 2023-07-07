import { type Response } from "express";
import { type CustomError } from "../interfaces/utils";

class ErrorHandler extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err: CustomError, res: Response) => {
  res.status(err.statusCode || 500).json({
    message: err.message,
    status: "error",
    data: null,
  });
};

export { ErrorHandler, handleError };

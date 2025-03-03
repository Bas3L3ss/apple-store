import { type NextFunction, type Request, type Response } from "express";
import { ISDEVELOPMENT } from "../constants";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    statusCode = 500,
    message = "Internal server error",
    ...rest
  } = error;

  if (ISDEVELOPMENT) console.log(message);

  res.status(statusCode).json({
    message,
    ...rest,
  });
};

export default errorHandler;

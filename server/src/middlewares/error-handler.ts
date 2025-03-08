import { type NextFunction, type Request, type Response } from "express";
import { ISDEVELOPMENT } from "../constants";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode = 500, message = "Internal server error" } = error;

  if (ISDEVELOPMENT) console.log("Error:", message);

  res.status(statusCode).json({ message });
};

export default errorHandler;

import { type NextFunction, type Request, type Response } from "express";
import { ISDEVELOPMENT } from "../constants";
import logger from "../utils/pino-logger";
const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode = 500, message = "Internal server error" } = error;

  if (ISDEVELOPMENT) console.log("Error:", message);

  logger.error({ statusCode, message, stack: error.stack });

  res.status(statusCode).json({ message });
};

export default errorHandler;

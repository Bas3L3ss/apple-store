import { type NextFunction, type Request, type Response } from "express";
import { ISDEVELOPMENT } from "../constants";

const errorHandlerWithHtml = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode = 500, message = "Internal server error" } = error;

  if (ISDEVELOPMENT) console.log("Error:", message);

  res.status(statusCode).render("error", { message });
};

export default errorHandlerWithHtml;

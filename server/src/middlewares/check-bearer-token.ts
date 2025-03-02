import { type RequestHandler, Request, Response, NextFunction } from "express";
import jwt from "../utils/jwt";

// Extend Request type to include `auth`
interface AuthenticatedRequest extends Request {
  auth?: any; // Adjust this type based on the token payload
}

const checkBearerToken: RequestHandler = (
  req: AuthenticatedRequest, // Use the extended type
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next({
        statusCode: 400,
        message: "Token not provided",
      });
    }

    const auth = jwt.verifyToken(token);

    if (!auth) {
      return next({
        statusCode: 401,
        message: "Invalid token",
      });
    }

    req.auth = typeof auth === "string" ? JSON.parse(auth) : auth; // Now `auth` is a recognized property

    next();
  } catch (error) {
    next({
      statusCode: 401,
      message: "Invalid token",
    });
  }
};

export default checkBearerToken;

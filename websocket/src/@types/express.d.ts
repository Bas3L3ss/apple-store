import jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    auth?: jwt.JwtPayload; // Adjust based on your token payload structure
  }
}

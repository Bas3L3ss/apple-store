import { type RequestHandler } from "express";

const checkAdminRole: RequestHandler = (req, res, next): void => {
  if (!req.auth || req.auth.role !== "admin") {
    res.status(403).json({ success: false, message: "Forbidden: Admins only" });
    return;
  }
  next();
};

export default checkAdminRole;

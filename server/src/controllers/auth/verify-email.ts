import { Request, Response, NextFunction } from "express";
import jwt from "../../utils/jwt";
import Account from "../../models/Account";

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.query.token as string;
    if (!token) {
      return next({
        statusCode: 400,
        message: "Verification token is required",
      });
    }

    const decoded = await jwt.verifyToken(token);

    if (!decoded?.email) {
      return next({ statusCode: 400, message: "Invalid or expired token" });
    }

    const account = await Account.findOne({ email: decoded.email });

    if (!account) {
      return next({ statusCode: 404, message: "User not found" });
    }

    if (account.verified) {
      return next({ statusCode: 400, message: "Email already verified" });
    }

    account.verified = true;
    await account.save();

    return res.render("email-verification");
  } catch (error) {
    next(error);
  }
};

export default verifyEmail;

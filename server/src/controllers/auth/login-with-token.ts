import { type RequestHandler } from "express";
import jwt from "../../utils/jwt";

const loginWithToken: RequestHandler = async (req, res, next) => {
  try {
    const account = req.auth || {};

    if (!account) {
      return next({
        statusCode: 400,
        message: "Bad credentials",
      });
    }

    // Generate access token
    const token = jwt.signToken({ uid: account._id });

    res.status(200).json({
      message: "Succesfully got account",
      data: account,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export default loginWithToken;

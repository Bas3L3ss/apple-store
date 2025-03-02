import { type RequestHandler } from "express";
import joi from "../../utils/joi";
import jwt from "../../utils/jwt";
import crypt from "../../utils/crypt";
import Account from "../../models/Account";

const register: RequestHandler = async (req, res, next) => {
  try {
    const validationError = await joi.validate(
      {
        username: joi.instance.string().required(),
        email: joi.instance.string().email().required(),
        password: joi.instance.string().min(6).required(),
      },
      req.body
    );

    if (validationError) {
      return next(validationError);
    }

    const { username, email, password } = req.body;

    const existingUser = await Account.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return next({
        statusCode: 400,
        message: "An account with this username or email already exists",
      });
    }

    const hashedPassword = await crypt.hash(password);

    const newAccount = new Account({
      username,
      email,
      password: hashedPassword,
      verified: false,
    });

    await newAccount.save();

    const token = jwt.signToken({ uid: newAccount._id, role: newAccount.role });

    const { password: _, ...data } = newAccount.toObject();

    res.status(201).json({
      message: "Successfully registered",
      data,
      token,
    });

    // TODO: Send a verification email here (optional)
  } catch (error) {
    next(error);
  }
};

export default register;

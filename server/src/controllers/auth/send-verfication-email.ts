import { type RequestHandler } from "express";
import jwt from "../../utils/jwt";
import { AuthenticatedRequest } from "../../middlewares/check-bearer-token";
import { sendEmail } from "../../utils/nodemailer";
import { BACKEND_URL } from "../../constants";

const sendVerificationEmail: RequestHandler = async (
  req: AuthenticatedRequest,
  res,
  next
) => {
  try {
    if (!req.auth || !req.auth.email) {
      res.status(400).json({ message: "Email not found in token" });
      return;
    }

    const { email, _id } = req.auth;

    const token = jwt.signToken({ uid: _id, email }, "10m");

    await sendEmail(
      `<p>Hi! There,</p>
             <p>You have recently visited our website and we need to verify your email.</p>
             <p>Please click the link below to verify your email:</p>
             <a href="${BACKEND_URL}/auth/verify?token=${token}">Verify Email</a>
             <p>Thanks</p>`,
      email,
      "Email verfication"
    );
    res.status(201).json({ success: true });
  } catch {
    next({
      statusCode: 401,
      message: "Fail to send email confirmation",
    });
  }
};

export default sendVerificationEmail;

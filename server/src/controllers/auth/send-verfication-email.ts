import { type RequestHandler } from "express";
import nodemailer from "nodemailer";
import jwt from "../../utils/jwt";
import { EMAIL, PASSWORD } from "../../constants";
import { AuthenticatedRequest } from "../../middlewares/check-bearer-token";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

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
    console.log(req.auth);

    const token = jwt.signToken({ uid: _id, email }, "10m");

    const mailConfigurations = {
      from: EMAIL,
      to: email,
      subject: "Email Verification",
      html: `<p>Hi! There,</p>
             <p>You have recently visited our website and we need to verify your email.</p>
             <p>Please click the link below to verify your email:</p>
             <a href="http://localhost:8080/auth/verify?token=${token}">Verify Email</a>
             <p>Thanks</p>`,
    };

    await transporter.sendMail(mailConfigurations);
    res.status(201).json({ success: true });
  } catch {
    next({
      statusCode: 401,
      message: "Fail to send email confirmation",
    });
  }
};

export default sendVerificationEmail;

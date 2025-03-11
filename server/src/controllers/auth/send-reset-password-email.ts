import { type RequestHandler } from "express";
import jwt from "../../utils/jwt";
import { AuthenticatedRequest } from "../../middlewares/check-bearer-token";
import { sendEmail } from "../../utils/nodemailer";
import Account from "../../models/Account";

const sendResetPasswordEmail: RequestHandler = async (
  req: AuthenticatedRequest,
  res,
  next
) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    // ✅ Check if user exists
    const user = await Account.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // ✅ Generate token
    const token = jwt.signToken({ uid: user._id, email }, "5m");

    // ✅ Use an environment variable for frontend URL
    const resetLink = `http://localhost:5173/auth/reset-password?token=${token}`;

    // ✅ Send email
    await sendEmail(
      `<p>Hi! ${user.username},</p>
       <p>You requested a password reset.</p>
       <p><strong>Do not share this link with anyone.</strong></p>
       <p><a href="${resetLink}">Click here to reset your password</a></p>
       <p>Thanks,</p>
       <p>Your Company Team</p>`,
      email,
      "Reset Your Password"
    );

    res.status(200).json({ success: true, message: "Reset email sent" });
    return;
  } catch (error) {
    console.error("Error sending reset email:", error);
    next({
      statusCode: 500,
      message: "Failed to send password reset email",
    });
  }
};

export default sendResetPasswordEmail;

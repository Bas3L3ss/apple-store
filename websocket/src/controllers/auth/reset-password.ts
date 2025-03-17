import { type RequestHandler } from "express";
import Account from "../../models/Account";
import crypt from "../../utils/crypt";

import { AuthenticatedRequest } from "../../middlewares/check-bearer-token";

const resetPassword: RequestHandler = async (
  req: AuthenticatedRequest,
  res,
  next
) => {
  try {
    const { _id } = req.auth; // Already verified by middleware
    const { password } = req.body;

    if (!password) {
      return next({ statusCode: 400, message: "New password is required" });
    }

    // Hash the password
    const hashedPassword = await crypt.hash(password);

    // Update the account with the new password
    const updatedAccount = await Account.findByIdAndUpdate(
      _id,
      { $set: { password: hashedPassword } },
      { new: true, runValidators: true }
    );

    if (!updatedAccount) {
      return next({ statusCode: 404, message: "Account not found" });
    }

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default resetPassword;

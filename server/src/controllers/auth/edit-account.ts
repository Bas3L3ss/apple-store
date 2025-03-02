import { type RequestHandler } from "express";
import Account from "../../models/Account";

const editAccount: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.auth; // Assuming `req.user` is set from authentication middleware
    const { username, avatar, email } = req.body;

    const updatedAccount = await Account.findByIdAndUpdate(
      userId,
      { $set: { username, avatar, email } },
      { new: true, runValidators: true }
    );

    if (!updatedAccount) {
      return next({ message: "Account not found" });
    }
    res.status(200).json({
      success: true,
      message: "Account updated successfully",
      account: updatedAccount,
    });
  } catch (error) {
    next(error);
  }
};

export default editAccount;

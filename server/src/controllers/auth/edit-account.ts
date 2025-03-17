import { type RequestHandler } from "express";
import Account from "../../models/Account";
import { AuthenticatedRequest } from "../../middlewares/check-bearer-token";

const editAccount: RequestHandler = async (
  req: AuthenticatedRequest,
  res,
  next
) => {
  try {
    const user = req.auth;
    if (!user || !user._id) {
      return next({ statusCode: 401, message: "Unauthorized" });
    }

    const { username, avatar, email } = req.body;
    const updateData: Record<string, any> = { username, avatar };

    if (email && email !== user.email) {
      updateData.email = email;
      updateData.verified = false;
    }

    const updatedAccount = await Account.findByIdAndUpdate(
      user._id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedAccount) {
      return next({ statusCode: 404, message: "Account not found" });
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

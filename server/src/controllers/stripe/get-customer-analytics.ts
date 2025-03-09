import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../middlewares/check-bearer-token";
import { stripe } from "../../utils/stripe";

export async function GetCustomerAnalytics(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.auth;
    if (!email) {
      res.status(400).json({ success: false, message: "Email is required" });
      return;
    }

    const customers = await stripe.customers.list({ email });
    if (!customers.data.length) {
      res.status(404).json({ success: false, message: "Customer not found" });
      return;
    }

    const customer = customers.data[0];

    const payments = await stripe.paymentIntents.list({
      customer: customer.id,
      limit: 100,
    });

    const totalSpent = payments.data.reduce(
      (sum, p) => sum + (p.amount_received || 0),
      0
    );
    const totalOrders = payments.data.length;
    const lastPurchase =
      totalOrders > 0 ? new Date(payments.data[0].created * 1000) : null;

    res.status(200).json({
      success: true,
      data: {
        totalSpent: totalSpent / 100,
        lastPurchase,
      },
    });
  } catch (error) {
    next(error);
  }
}

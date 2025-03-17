import express from "express";
import checkBearerToken from "../middlewares/check-bearer-token";
import errorHandler from "../middlewares/error-handler";
import { createCheckoutSession } from "../controllers/stripe/create-checkout-session";

const router = express.Router();

// POST: Create create checkout session
router.post(
  "/session",
  express.raw({ type: "application/json" }),
  [checkBearerToken, createCheckoutSession],
  errorHandler
);

export default router;

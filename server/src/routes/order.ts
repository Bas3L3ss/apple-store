import express from "express";
import checkBearerToken from "../middlewares/check-bearer-token";
import errorHandler from "../middlewares/error-handler";
import { GetOrderById } from "../controllers/order/get-order-by-id";
import { GetOrders } from "../controllers/order/get-orders";
import { handleStripeWebhook } from "../middlewares/handle-stripe-webhooks";

const router = express.Router();

// POST: Create order from other method
// TODO: implement apple card, cod
// router.post(
//   "/",
//   express.raw({ type: "application/json" }),
//   [handleStripeWebhook, CreateOrder],
//   errorHandler
// );

// POST: webhook to create order from Stripe
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  [handleStripeWebhook],
  errorHandler
);

// GET: Fetch all orders
router.get("/", [checkBearerToken, GetOrders], errorHandler);

// GET: Fetch a single order by ID
router.get("/:id", [checkBearerToken, GetOrderById], errorHandler);

export default router;

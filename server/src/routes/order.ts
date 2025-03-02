import express from "express";
import checkBearerToken from "../middlewares/check-bearer-token";
import errorHandler from "../middlewares/error-handler";
import { CreateOrder } from "../controllers/order/create-order";
import { GetOrderById } from "../controllers/order/get-order-by-id";
import { GetOrders } from "../controllers/order/get-orders";

const router = express.Router();

router.post("/", [checkBearerToken, CreateOrder], errorHandler);

// GET: Fetch all orders
router.get("/", [checkBearerToken, GetOrders], errorHandler);

// GET: Fetch a single order by ID
router.get("/:id", [checkBearerToken, GetOrderById], errorHandler);

export default router;

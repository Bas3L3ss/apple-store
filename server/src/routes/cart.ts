import express from "express";
import checkBearerToken from "../middlewares/check-bearer-token";
import errorHandler from "../middlewares/error-handler";
import { CreateOrUpdateCartItem } from "../controllers/cart/update-or-create-cart-item";
import { DeleteCartItem } from "../controllers/cart/delete-cart-item";
import { GetCartItems } from "../controllers/cart/get-cart-item";

const router = express.Router();

// POST: Update or create cart item
router.post("/", [checkBearerToken, CreateOrUpdateCartItem], errorHandler);

// DELETE: Delete one or all cart items by userId
router.delete("/", [checkBearerToken, DeleteCartItem], errorHandler);

// GET: Fetch all cart items by userId
router.get("/", [checkBearerToken, GetCartItems], errorHandler);

export default router;

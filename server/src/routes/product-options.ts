import express from "express";
import checkBearerToken from "../middlewares/check-bearer-token";
import errorHandler from "../middlewares/error-handler";
import checkAdminRole from "../controllers/auth/check-admin-role";
import { CreateProductOption } from "../controllers/product/create-product-options";
import { GetProductOptions } from "../controllers/product/get-product-options";
import { GetProductOptionById } from "../controllers/product/get-product-option-by-id";

const router = express.Router();

router.post(
  "/",
  [checkBearerToken, checkAdminRole, CreateProductOption],
  errorHandler
);

// GET: Fetch all product options
router.get("/", GetProductOptions, errorHandler);

// GET: Fetch a single product option by ID
router.get("/:id", GetProductOptionById, errorHandler);

export default router;

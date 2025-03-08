import express from "express";
import checkBearerToken from "../middlewares/check-bearer-token";
import errorHandler from "../middlewares/error-handler";
import { GetProductById } from "../controllers/product/get-product-by-id";
import { GetProducts } from "../controllers/product/get-products";
import { CreateProduct } from "../controllers/product/create-product";
import checkAdminRole from "../controllers/auth/check-admin-role";
import { CreateMockProduct } from "../controllers/product/create-random-mockdata";

const router = express.Router();

router.post(
  "/",
  [checkBearerToken, checkAdminRole, CreateProduct],
  errorHandler
);

// GET: Fetch all products
router.get("/", GetProducts, errorHandler);

// GET: Fetch a single product by ID
router.get("/:id", GetProductById, errorHandler);

router.post(
  "/test",
  [checkBearerToken, checkAdminRole, CreateMockProduct],
  errorHandler
);

export default router;

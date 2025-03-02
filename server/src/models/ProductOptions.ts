import { model, Schema } from "mongoose";
import { ProductOption } from "../@types";

const ProductOptionSchema = new Schema<ProductOption>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    color: { type: String, required: false },
    material: { type: String, required: false },
    storage: { type: String, required: false },
    size: { type: String, required: false },
    processor: { type: String, required: false },
    accessories: { type: String, required: false },
    carrier: { type: String, required: false },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

const ProductOptionModel = model<ProductOption>(
  "ProductOption",
  ProductOptionSchema
);
export { ProductOptionModel };

import { model, Schema } from "mongoose";
import { ProductOption } from "../@types";

// TODO: make this dynamic , follow this pattern instead
// const productOptionSchema = new mongoose.Schema({
//   productId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Product",
//     required: true,
//   },
//   optionType: { type: String, required: true }, // e.g., "storage", "color", etc.
//   value: { type: String, required: true }, // e.g., "256GB", "8TB", etc.
//   price: { type: Number, required: true },
// });

// // Enforce uniqueness on (productId, optionType, value)
// productOptionSchema.index(
//   { productId: 1, optionType: 1, value: 1 },
//   { unique: true }
// );

// const ProductOption = mongoose.model("ProductOption", productOptionSchema);

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
ProductOptionSchema.index(
  {
    productId: 1,
    color: 1,
    material: 1,
    storage: 1,
    size: 1,
    processor: 1,
    accessories: 1,
    carrier: 1,
  },
  { unique: true, sparse: true } // 'sparse: true' allows multiple null values
);

const ProductOptionModel = model<ProductOption>(
  "ProductOption",
  ProductOptionSchema
);
export { ProductOptionModel };

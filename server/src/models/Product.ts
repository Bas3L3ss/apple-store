import { model, Schema } from "mongoose";
import { Product } from "../@types";

const ProductSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    productImages: { type: [String], required: true },
    slug: { type: String, required: false, unique: true },
    basePrice: { type: Number, required: true },
    category: {
      type: String,
      enum: [
        "iphone",
        "macbook",
        "apple_watch",
        "ipad",
        "airpods",
        "phonecase",
      ],
      required: true,
    },
    stock: { type: Number, required: true },
    productSelectionStep: { type: [String], required: true },
    productOptions: [{ type: Schema.Types.ObjectId, ref: "ProductOption" }],
  },
  { timestamps: true }
);

const ProductModel = model<Product>("Product", ProductSchema);

export { ProductModel };

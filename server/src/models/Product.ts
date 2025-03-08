import { model, Schema } from "mongoose";
import { Product } from "../@types";
import { ProductOptionModel } from "./ProductOptions";

const ProductSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    productImages: { type: [String], required: true },
    slug: { type: String, required: true, unique: true },
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
    isFeatured: { type: Boolean, default: false }, // Add new field

    productSelectionStep: { type: [String], required: true },
    productOptions: [{ type: Schema.Types.ObjectId, ref: "ProductOption" }],
  },
  { timestamps: true }
);
ProductSchema.index({ name: "text", slug: "text" });

ProductSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      await ProductOptionModel.deleteMany({ productId: this._id });
      next();
    } catch (err) {
      next(err);
    }
  }
);

const ProductModel = model<Product>("Product", ProductSchema);

export { ProductModel };

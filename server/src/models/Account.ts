import { type Document, model, Schema } from "mongoose";
import { type Account } from "../@types";

interface I extends Document, Account {
  verified: boolean;
  email: string;
}

const instance = new Schema<I>(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
      required: false,
      default: "",
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const modelName = "Account";

export default model<I>(modelName, instance);

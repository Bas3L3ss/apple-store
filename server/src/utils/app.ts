import express from "express";
import cors from "cors";
import { ORIGIN } from "../constants/index";
import morgan from "morgan";
import path from "path";
import errorHandler from "../middlewares/error-handler";
import { handleStripeWebhook } from "../middlewares/handle-stripe-webhooks";
// initialize app
const app = express();

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// middlewares
app.use(cors({ origin: ORIGIN }));

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook,
  errorHandler
);

app.use(express.json()); // body parser

app.use(express.urlencoded({ extended: false })); // url parser
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
export default app;

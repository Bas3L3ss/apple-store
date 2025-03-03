import express from "express";
import cors from "cors";
import { ORIGIN } from "../constants/index";
import morgan from "morgan";
// initialize app
const app = express();
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// middlewares
app.use(cors({ origin: ORIGIN }));
app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: false })); // url parser

export default app;

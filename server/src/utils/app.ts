import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import rateLimit from "express-rate-limit";
import { ORIGIN } from "../constants/index";
import errorHandler from "../middlewares/error-handler";
import { handleStripeWebhook } from "../middlewares/handle-stripe-webhooks";
import mongoSanitize from "express-mongo-sanitize";
import timeout from "connect-timeout";
import pinoHttp from "pino-http";
import { logger } from "./pino-logger";

const app = express();

// Security Middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(
  cors({
    origin: ORIGIN,
    // TODO: this is for jwt stored in cookies
    // credentials: true
  })
);

// // 🔹 Place `/upload` BEFORE `express.json()` because files are NOT JSON
// app.post("/upload", upload.single("file"), (req, res) => {
//   res.json({ success: true, filePath: req.file?.path });
// });

// Global Rate Limiting (applies to `/auth`, `/products`, etc.)
const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests, please try again later",
});
app.use(apiLimiter);

app.use(timeout("5s"));
app.use((req, res, next) => {
  if (!req.timedout) next();
});

app.use(
  pinoHttp({
    logger,
    customLogLevel: (req, res) => {
      if (res.statusCode >= 500) return "error";
      if (
        res.statusCode === 401 ||
        res.statusCode === 403 ||
        res.statusCode === 404
      )
        return "warn";
      if (res.statusCode >= 400) return "warn";
      if (res.statusCode === 304) return "debug";
      if (res.statusCode >= 300 && res.statusCode < 400) return "info";

      return "info";
    },
    serializers: {
      req: (req) => ({
        method: req.method,
        url: req.url,
        ip:
          req.ip ||
          req.headers["x-forwarded-for"] ||
          (req.socket ? req.socket.remoteAddress : "unknown"),
        userAgent: req.headers["user-agent"],
      }),
      res: (res) => ({
        statusCode: res.statusCode,
      }),
    },
  })
);

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook,
  errorHandler
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

export default app;

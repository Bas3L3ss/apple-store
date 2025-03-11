import pino from "pino";
import { ISDEVELOPMENT } from "../constants";

export const logger = pino({
  level: !ISDEVELOPMENT ? "warn" : "info", // Restrict logs in production
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "HH:MM:ss.l",
      ignore: "pid,hostname",
    },
  },
});

export default logger;

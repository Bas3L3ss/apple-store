import dotenv from "dotenv";
dotenv.config();
const ORIGIN = "*";
const PORT = process.env.PORT || 8080;

console.log(process.env.MONGO_URI);
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority";
const MONGO_OPTIONS = {};

const JWT_SECRET = process.env.JWT_SECRET || "unsafe_secret";

export { ORIGIN, PORT, MONGO_URI, MONGO_OPTIONS, JWT_SECRET };

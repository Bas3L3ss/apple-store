import dotenv from "dotenv";
dotenv.config();

import app from "./utils/app"; // (server)
import mongo from "./utils/mongo"; // (database)
import { PORT } from "./constants/index";
import authRoutes from "./routes/auth";
import cartRoutes from "./routes/cart";
import orderRoutes from "./routes/order";
import productRoutes from "./routes/product";
import stripeRoutes from "./routes/checkout";
import productOptionRoutes from "./routes/product-options";

const bootstrap = async () => {
  await mongo.connect();

  app.get("/", (req, res) => {
    res.status(200).send("Hello, world!");
  });

  app.get("/healthz", (req, res) => {
    res.status(204).end();
  });

  app.use("/auth", authRoutes);
  app.use("/products", productRoutes);
  app.use("/orders", orderRoutes);
  app.use("/carts", cartRoutes);
  app.use("/checkout", stripeRoutes);
  app.use("/product-options", productOptionRoutes);

  app.listen(PORT, () => {
    console.log(`✅ Server is listening on port: ${PORT}`);
  });
};

bootstrap();

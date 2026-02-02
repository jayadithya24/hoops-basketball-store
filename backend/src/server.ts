import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cart.js";
import productsRoutes from "./routes/products.js";
import checkoutRoutes from "./routes/checkout.js";

const app = express();
const prisma = new PrismaClient();

// ===============================
// MIDDLEWARE
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// ROUTES
// ===============================
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/products", productsRoutes);
app.use("/checkout", checkoutRoutes);

// ===============================
// HEALTH CHECK / TEST ROUTE
// ===============================
app.get("/", (req: Request, res: Response): void => {
  res.send("Backend running...");
});

// ===============================
// SERVER START (RENDER SAFE)
// ===============================
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

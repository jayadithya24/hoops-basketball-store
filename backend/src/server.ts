import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cart.js";
import productsRoutes from "./routes/products.js";
import checkoutRoutes from "./routes/checkout.js";

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/products", productsRoutes);
app.use("/checkout", checkoutRoutes);

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("Backend running...");
});

// Render-safe port
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

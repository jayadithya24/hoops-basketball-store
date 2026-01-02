import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/authRoutes.ts";
import cartRoutes from "./routes/cart.ts";
import productsRoutes from "./routes/products.ts";
import checkoutRoutes from "./routes/checkout.ts";


const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);                     // ✅ NOW WORKS
app.use("/products", productsRoutes);
app.use("/checkout", checkoutRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend running...");
});

app.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});

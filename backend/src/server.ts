import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cart.js";
import productsRoutes from "./routes/products.js";
import checkoutRoutes from "./routes/checkout.js";



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

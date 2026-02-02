import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Get ALL products
router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error("❌ PRODUCTS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch products",
      error: String(error),
    });
  }
});


export default router;

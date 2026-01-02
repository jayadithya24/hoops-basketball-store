import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Get ALL products
router.get("/", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

export default router;

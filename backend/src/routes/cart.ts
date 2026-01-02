console.log("CART ROUTES LOADED!!!");

import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

// GET CART ITEMS (Correct: uses req.userId)
router.get("/", authMiddleware, async (req: any, res) => {
  try {
    const items = await prisma.cartItem.findMany({
      where: { userId: req.userId },
      include: { product: true },
    });

    res.json(items);
  } catch (err) {
    console.error("Cart Load Error:", err);
    res.status(500).json({ error: "Failed to load cart" });
  }
});

// ADD ITEM
router.post("/add/:productId", authMiddleware, async (req: any, res) => {
  const productId = Number(req.params.productId);

  try {
    const existing = await prisma.cartItem.findFirst({
      where: { userId: req.userId, productId },
    });

    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + 1 },
      });
      return res.json(updated);
    }

    const newItem = await prisma.cartItem.create({
      data: {
        userId: req.userId,
        productId,
        quantity: 1,
      },
    });

    res.json(newItem);
  } catch (err) {
    console.error("Add Error:", err);
    res.status(500).json({ error: "Failed to add item" });
  }
});

// INCREASE
router.post("/increase/:id", authMiddleware, async (req: any, res) => {
  const id = Number(req.params.id);

  try {
    const updated = await prisma.cartItem.update({
      where: { id },
      data: { quantity: { increment: 1 } },
    });

    res.json(updated);
  } catch (err) {
    console.error("Increase Error:", err);
    res.status(500).json({ error: "Failed to increase quantity" });
  }
});

// DECREASE
router.post("/decrease/:id", authMiddleware, async (req: any, res) => {
  const id = Number(req.params.id);

  try {
    const item = await prisma.cartItem.findUnique({ where: { id } });

    if (!item) return res.status(404).json({ error: "Item not found" });

    if (item.quantity === 1) {
      await prisma.cartItem.delete({ where: { id } });
      return res.json({ message: "Item removed" });
    }

    const updated = await prisma.cartItem.update({
      where: { id },
      data: { quantity: { decrement: 1 } },
    });

    res.json(updated);
  } catch (err) {
    console.error("Decrease Error:", err);
    res.status(500).json({ error: "Failed to decrease quantity" });
  }
});

// REMOVE ITEM
router.delete("/:id", authMiddleware, async (req: any, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.cartItem.delete({ where: { id } });
    res.json({ message: "Item removed" });
  } catch (err) {
    console.error("Remove Error:", err);
    res.status(500).json({ error: "Failed to remove item" });
  }
});

export default router;

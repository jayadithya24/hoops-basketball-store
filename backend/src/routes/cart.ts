import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth.js";

console.log("CART ROUTES LOADED!!!");

const router = Router();
const prisma = new PrismaClient();

// ===============================
// GET CART ITEMS
// ===============================
router.get(
  "/",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
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
  }
);

// ===============================
// ADD ITEM (BY PRODUCT ID)
// ===============================
router.post(
  "/add/:productId",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    const productId = Number(req.params.productId);

    try {
      const existing = await prisma.cartItem.findFirst({
        where: { userId: req.userId, productId },
      });

      if (existing) {
        const updated = await prisma.cartItem.update({
          where: { id: existing.id },
          data: { quantity: { increment: 1 } },
        });
        res.json(updated);
        return;
      }

      const newItem = await prisma.cartItem.create({
        data: {
          userId: req.userId!,
          productId,
          quantity: 1,
        },
      });

      res.json(newItem);
    } catch (err) {
      console.error("Add Error:", err);
      res.status(500).json({ error: "Failed to add item" });
    }
  }
);

// ===============================
// INCREASE QUANTITY (BY CART ITEM ID)
// ===============================
router.post(
  "/increase/:id",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
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
  }
);

// ===============================
// DECREASE QUANTITY (BY CART ITEM ID)
// ===============================
router.post(
  "/decrease/:id",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
      const item = await prisma.cartItem.findUnique({ where: { id } });

      if (!item) {
        res.status(404).json({ error: "Item not found" });
        return;
      }

      if (item.quantity === 1) {
        await prisma.cartItem.delete({ where: { id } });
        res.json({ message: "Item removed" });
        return;
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
  }
);

// ===============================
// REMOVE ITEM (BY CART ITEM ID)
// ===============================
router.delete(
  "/:id",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
      await prisma.cartItem.delete({ where: { id } });
      res.json({ message: "Item removed" });
    } catch (err) {
      console.error("Remove Error:", err);
      res.status(500).json({ error: "Failed to remove item" });
    }
  }
);

export default router;

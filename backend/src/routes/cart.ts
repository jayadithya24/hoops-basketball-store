import { Router, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware, AuthRequest } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

// ===============================
// GET CART ITEMS
// ===============================
router.get(
  "/",
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.userId;

      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const items = await prisma.cartItem.findMany({
        where: { userId },
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
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.userId;
      const productId = Number(req.params.productId);

      if (!userId || !productId) {
        res.status(400).json({ error: "Invalid request" });
        return;
      }

      const existing = await prisma.cartItem.findFirst({
        where: { userId, productId },
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
          userId,
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
// INCREASE QUANTITY
// ===============================
router.post(
  "/increase/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);

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
// DECREASE QUANTITY
// ===============================
router.post(
  "/decrease/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);

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
// REMOVE ITEM
// ===============================
router.delete(
  "/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await prisma.cartItem.delete({ where: { id } });
      res.json({ message: "Item removed" });
    } catch (err) {
      console.error("Remove Error:", err);
      res.status(500).json({ error: "Failed to remove item" });
    }
  }
);

export default router;

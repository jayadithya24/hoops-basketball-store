import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

/**
 * Extend Express Request to include userId
 */
interface AuthRequest extends Request {
  userId?: number;
}

// POST /checkout
router.post(
  "/",
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      // 🔥 DEBUG
      console.log("CHECKOUT called. req.userId =", req.userId);

      const { address, paymentMethod } = req.body;

      if (!address || !paymentMethod) {
        res.status(400).json({ error: "Address & payment method required" });
        return;
      }

      // Ensure logged-in user
      const userId = req.userId;
      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      // Fetch user's cart
      const cartItems = await prisma.cartItem.findMany({
        where: { userId },
        include: { product: true },
      });

      if (cartItems.length === 0) {
        res.status(400).json({ error: "Cart is empty" });
        return;
      }

      // Calculate total
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      // Create order + order items
      const order = await prisma.order.create({
        data: {
          userId,
          address,
          paymentMethod,
          totalAmount,
          items: {
            create: cartItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          },
        },
        include: { items: true },
      });

      // Clear cart
      await prisma.cartItem.deleteMany({
        where: { userId },
      });

      res.status(201).json({
        message: "Order placed successfully",
        order,
      });
    } catch (error) {
      console.error("Checkout error:", error);
      res.status(500).json({ error: "Checkout failed" });
    }
  }
);

export default router;

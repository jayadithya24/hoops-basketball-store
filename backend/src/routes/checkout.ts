import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

// POST /checkout
router.post("/", authMiddleware, async (req: any, res) => {
  try {
    // 🔥 DEBUG: Check if token decoded correctly
    console.log("CHECKOUT called. req.userId =", req.userId);

    const { address, paymentMethod } = req.body;

    if (!address || !paymentMethod) {
      return res.status(400).json({ error: "Address & payment method required" });
    }

    // Ensure we have a valid logged-in user ID
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Fetch user's cart
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Calculate total
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Create order + items
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
    await prisma.cartItem.deleteMany({ where: { userId } });

    return res.json({
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    console.error("Checkout error:", error);
    return res.status(500).json({ error: "Checkout failed" });
  }
});

export default router;

import express, { Response } from 'express';
import prisma from '../config/prisma.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

const inMemoryWishlist: Map<string, Set<string>> = new Map();

// GET /api/wishlist - Get user's wishlist
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id || 'anonymous';
    try {
      const items = await prisma.wishlist.findMany({
        where: { userId },
        include: { product: { include: { category: true } } },
      });
      const products = items.map((i) => i.product);
      res.status(200).json({ status: 'success', results: products.length, data: { products } });
    } catch {
      const userWishlistIds = Array.from(inMemoryWishlist.get(userId) || []);
      const products = await prisma.product.findMany({
        where: { id: { in: userWishlistIds } },
        include: { category: true },
      });
      res.status(200).json({ status: 'success', results: products.length, data: { products } });
    }
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Server error' });
  }
});

// POST /api/wishlist/toggle - Add/Remove product from wishlist
router.post('/toggle', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id || 'anonymous';
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ status: 'error', message: 'productId is required' });
    }

    try {
      const existing = await prisma.wishlist.findUnique({
        where: { userId_productId: { userId, productId } },
      });

      if (existing) {
        await prisma.wishlist.delete({ where: { id: existing.id } });
        return res.status(200).json({ status: 'success', message: 'Removed from wishlist', action: 'removed' });
      } else {
        await prisma.wishlist.create({ data: { userId, productId } });
        return res.status(201).json({ status: 'success', message: 'Added to wishlist', action: 'added' });
      }
    } catch {
      if (!inMemoryWishlist.has(userId)) {
        inMemoryWishlist.set(userId, new Set());
      }
      const set = inMemoryWishlist.get(userId)!;
      if (set.has(productId)) {
        set.delete(productId);
        return res.status(200).json({ status: 'success', message: 'Removed from wishlist', action: 'removed' });
      } else {
        set.add(productId);
        return res.status(201).json({ status: 'success', message: 'Added to wishlist', action: 'added' });
      }
    }
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Server error' });
  }
});

// DELETE /api/wishlist/:productId - Remove product from wishlist
router.delete('/:productId', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id || 'anonymous';
    const productId = String(req.params.productId);

    try {
      await prisma.wishlist.deleteMany({ where: { userId, productId } });
    } catch {
      const set = inMemoryWishlist.get(userId);
      if (set) set.delete(productId);
    }

    res.status(200).json({ status: 'success', message: 'Removed from wishlist' });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Server error' });
  }
});

export default router;

import express, { Response } from 'express';
import prisma from '../config/prisma.js';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// POST /api/orders - Create new order
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { items, totalAmount, address, city, postalCode, country } = req.body;

    if (!items || items.length === 0 || !totalAmount || !userId) {
      return res.status(400).json({ status: 'error', message: 'Cart items and total amount are required' });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount: Number(totalAmount),
        address: address || '123 Main St',
        city: city || 'Bengaluru',
        postalCode: postalCode || '560001',
        country: country || 'India',
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: Number(item.quantity),
            price: Number(item.price),
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    res.status(201).json({ status: 'success', message: 'Order created successfully', data: { order } });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Server error' });
  }
});

// GET /api/orders/my-orders - Get customer orders
router.get('/my-orders', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ status: 'success', results: orders.length, data: { orders } });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Server error' });
  }
});

// GET /api/orders/admin - Get all orders (Admin Only)
router.get('/admin', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: { user: { select: { name: true, email: true } }, items: true },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ status: 'success', results: orders.length, data: { orders } });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Server error' });
  }
});


// PUT /api/orders/:id/status - Update order status (Admin Only)
router.put('/:id/status', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const id = String(req.params.id);
    const { status } = req.body;

    const updated = await prisma.order.update({
      where: { id },
      data: { status },
    });

    res.status(200).json({ status: 'success', message: 'Order status updated', data: { order: updated } });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Server error' });
  }
});

export default router;

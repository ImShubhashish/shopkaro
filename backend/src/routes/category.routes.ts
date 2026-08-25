import express, { Request, Response } from 'express';
import prisma from '../config/prisma.js';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// GET /api/categories - Get all categories
router.get('/', async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
    });
    res.status(200).json({ status: 'success', results: categories.length, data: { categories } });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Server error' });
  }
});

// POST /api/categories - Create category (Admin Only)
router.post('/', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { name, slug } = req.body;
    if (!name || !slug) {
      return res.status(400).json({ status: 'error', message: 'Name and slug are required' });
    }

    const category = await prisma.category.create({
      data: { name, slug },
    });
    res.status(201).json({ status: 'success', message: 'Category created', data: { category } });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Server error' });
  }
});


export default router;

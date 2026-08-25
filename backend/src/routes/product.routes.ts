import express, { Request, Response } from 'express';
import prisma from '../config/prisma.js';

const router = express.Router();

// GET /api/products - Get all products with optional category/search filter
router.get('/products', async (req: Request, res: Response) => {
  try {
    const { category, search, minPrice, maxPrice } = req.query;

    const where: any = {};

    if (category && category !== 'all') {
      where.categoryId = String(category);
    }

    if (search) {
      where.name = { contains: String(search), mode: 'insensitive' };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: { products },
    });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Server error' });
  }
});

// GET /api/products/:id - Get single product by ID
router.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true, reviews: true },
    });


    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Product not found' });
    }

    res.status(200).json({
      status: 'success',
      data: { product },
    });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Server error' });
  }
});

export default router;

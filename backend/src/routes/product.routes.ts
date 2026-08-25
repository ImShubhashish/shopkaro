import express, { Request, Response } from 'express';
import prisma from '../config/prisma.js';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth.js';

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

    res.status(200).json({ status: 'success', results: products.length, data: { products } });
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
      include: { category: true, reviews: { include: { user: { select: { name: true } } } } },
    });

    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Product not found' });
    }

    res.status(200).json({ status: 'success', data: { product } });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Server error' });
  }
});

// POST /api/products - Create new product (Admin Only)
router.post('/products', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, price, stock, categoryId, images } = req.body;
    if (!name || !price || !categoryId) {
      return res.status(400).json({ status: 'error', message: 'Name, price, and categoryId are required' });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        stock: Number(stock || 0),
        categoryId,
        images: images || [],
      },
    });

    res.status(201).json({ status: 'success', message: 'Product created successfully', data: { product } });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Server error' });
  }
});

// PUT /api/products/:id - Update product (Admin Only)
router.put('/products/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const id = String(req.params.id);
    const { name, description, price, stock, categoryId, images } = req.body;

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: price ? Number(price) : undefined,
        stock: stock !== undefined ? Number(stock) : undefined,
        categoryId,
        images,
      },
    });

    res.status(200).json({ status: 'success', message: 'Product updated successfully', data: { product: updated } });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Server error' });
  }
});

// DELETE /api/products/:id - Delete product (Admin Only)
router.delete('/products/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const id = String(req.params.id);
    await prisma.product.delete({ where: { id } });
    res.status(200).json({ status: 'success', message: 'Product deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Server error' });
  }
});

// POST /api/products/:id/reviews - Submit review (Protected User)
router.post('/products/:id/reviews', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const productId = String(req.params.id);
    const userId = req.user?.id;
    const { rating, comment } = req.body;

    if (!rating || !comment || !userId) {
      return res.status(400).json({ status: 'error', message: 'Rating and comment are required' });
    }

    const review = await prisma.review.create({
      data: {
        rating: Number(rating),
        comment,
        productId,
        userId,
      },
    });

    res.status(201).json({ status: 'success', message: 'Review submitted', data: { review } });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Server error' });
  }
});

export default router;


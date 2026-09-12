import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import prisma from '../config/prisma.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'shopkaro-secret-key-12345';

const inMemoryUsers: any[] = [];

// POST /api/auth/register - Register new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ status: 'error', message: 'Name, email, and password are required' });
    }

    let existingUser = null;
    try {
      existingUser = await prisma.user.findUnique({ where: { email } });
    } catch {
      // Database not reachable
    }

    if (!existingUser) {
      existingUser = inMemoryUsers.find((u) => u.email === email);
    }

    if (existingUser) {
      return res.status(409).json({ status: 'error', message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = `user-${Date.now()}`;
    const newUser = { id: userId, name, email, password: hashedPassword, role: 'USER' };

    try {
      await prisma.user.create({ data: { name, email, password: hashedPassword, role: 'USER' } });
    } catch {
      inMemoryUsers.push(newUser);
    }

    const exp = Date.now() + 5 * 60 * 1000;
    const token = jwt.encode({ id: newUser.id, role: newUser.role, exp }, JWT_SECRET);

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
        token,
      },
    });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Internal Server Error' });
  }
});


// POST /api/auth/login - Login user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Email and password are required' });
    }

    let user = null;
    try {
      user = await prisma.user.findUnique({ where: { email } });
    } catch {
      // Database not reachable
    }

    if (!user) {
      user = inMemoryUsers.find((u) => u.email === email);
    }

    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }

    const exp = Date.now() + 5 * 60 * 1000;
    const token = jwt.encode({ id: user.id, role: user.role, exp }, JWT_SECRET);

    res.status(200).json({
      status: 'success',
      message: 'Logged in successfully',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Internal Server Error' });
  }
});

// GET /api/auth/me - Fetch current user profile
router.get('/me', async (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'No token provided' });
  }

  try {
    const decoded = jwt.decode(token, JWT_SECRET);
    if (decoded.exp && Date.now() >= decoded.exp) {
      return res.status(401).json({ status: 'error', message: 'Session expired' });
    }

    let user = null;
    try {
      user = await prisma.user.findUnique({ where: { id: decoded.id } });
    } catch {
      user = inMemoryUsers.find((u) => u.id === decoded.id);
    }

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      },
    });
  } catch {
    res.status(401).json({ status: 'error', message: 'Invalid token' });
  }
});


// POST /api/auth/reset - Clear all user records and wishlist for testing
router.post('/reset', async (_req: Request, res: Response) => {
  try {
    inMemoryUsers.length = 0;
    try {
      await prisma.wishlist.deleteMany({});
      await prisma.orderItem.deleteMany({});
      await prisma.order.deleteMany({});
      await prisma.review.deleteMany({});
      await prisma.user.deleteMany({});
    } catch {
      // Ignored if DB not connected
    }
    res.status(200).json({ status: 'success', message: 'All user credentials and wishlist data cleared' });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Failed to reset' });
  }
});

export default router;

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

    const token = jwt.encode({ id: newUser.id, role: newUser.role }, JWT_SECRET);

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
      user = inMemoryUsers.find((u) => u.email === email);
    }

    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }

    const token = jwt.encode({ id: user.id, role: user.role }, JWT_SECRET);

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


export default router;

import express, { Response } from 'express';
import prisma from '../config/prisma.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// GET /api/users/profile - Get current user profile
router.get('/profile', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User profile not found' });
    }

    res.status(200).json({ status: 'success', data: { user } });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Server error' });
  }
});

// PUT /api/users/profile - Update user profile
router.put('/profile', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { name } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name },
      select: { id: true, name: true, email: true, role: true },
    });

    res.status(200).json({ status: 'success', message: 'Profile updated successfully', data: { user: updatedUser } });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Server error' });
  }
});

export default router;

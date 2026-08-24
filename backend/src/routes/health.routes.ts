import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'ShopKaro Backend API is running smoothly',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

export default router;

import { Request, Response, NextFunction } from 'express';
import jwt from 'jwt-simple';

const JWT_SECRET = process.env.JWT_SECRET || 'shopkaro-secret-key-12345';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: 'USER' | 'ADMIN';
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Authentication token required' });
  }

  try {
    const decoded = jwt.decode(token, JWT_SECRET);
    if (decoded.exp && Date.now() >= decoded.exp) {
      return res.status(401).json({ status: 'error', message: 'Session expired' });
    }
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ status: 'error', message: 'Invalid or expired authentication token' });
  }
};

export const optionalAuth = (req: AuthRequest, _res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.decode(token, JWT_SECRET);
      if (decoded.exp && Date.now() >= decoded.exp) {
        req.user = { id: 'anonymous', role: 'USER' };
      } else {
        req.user = decoded;
      }
    } catch {
      req.user = { id: 'anonymous', role: 'USER' };
    }
  } else {
    req.user = { id: 'anonymous', role: 'USER' };
  }
  next();
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ status: 'error', message: 'Access denied: Admin privileges required' });
  }
  next();
};

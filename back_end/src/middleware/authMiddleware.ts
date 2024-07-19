import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'] as string;

  if (!token) {
    return res.status(403).send('Token is required.');
  }

  jwt.verify(token, jwtSecret, (err, decoded: any) => {
    if (err) {
      return res.status(401).send('Invalid token.');
    }
    req.userId = decoded.id; // Assign userId to the request object
    next();
  });
};

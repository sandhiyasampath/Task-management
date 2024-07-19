import { Request } from 'express';

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      userId: number;
    }
  }
}

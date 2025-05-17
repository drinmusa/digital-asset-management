import { Request, Response, NextFunction } from 'express';

import { verifyToken } from '../utils/verifyToken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming the token is in the Authorization header
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    const user = verifyToken(token);

    if (!user) {
        res.status(401).json({ message: 'Invalid or expired token' });
        return;
    }
    req.user = user;

    next();
};

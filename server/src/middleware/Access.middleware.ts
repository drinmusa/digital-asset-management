import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
/**
 * Middleware to check if the authenticated user has the required role by fetching
 * the latest role from the database.
 *
 * @param requiredRole The role that the user must have to access the route.
 * @returns An Express middleware function.
 */
export const accessMiddleware = (requiredRole: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await prisma.user.findUnique({ where: { id: req.user.id } });
            if (!user || !user.role) {
                res.status(401).json({ message: 'Unauthorized!.' });
                return;
            }
            if (requiredRole === user.role) {
                next();
            } else {
                res.status(403).json({ message: 'Forbidden!' });
                return;
            }
        } catch (error) {
            console.error('Error fetching user role:', error);
            res.status(500).json({ message: 'Internal server error!' });
            return;
        }
    };
};

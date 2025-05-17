import { Router, NextFunction, Request, Response } from 'express';
export const AuthController: Router = Router();
import { AuthService } from '../services/Auth.service';
import { authMiddleware } from '../middleware/Authentication.middleware';
AuthController.get('/verify', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.split(' ')[1];
        const result = await AuthService.verifyToken(token);
        res.send(result.data).status(result.httpCode);
    } catch (error) {
        next(error);
    }
});

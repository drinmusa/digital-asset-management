import { NextFunction, Request, Response, Router } from 'express';

// middleware
import { ValidationMiddleware } from '../middleware/Validation.middleware';

// services
import { LoginService } from '../services/Login.service';

// validators
import { LoginValidator } from '../validators/Login.validator';

export const LoginController: Router = Router();

LoginController.post(
    '/',
    ValidationMiddleware(LoginValidator, {}, (req: Request) => req.body),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const result = await LoginService.login(email, password);
            res.send(result.data).status(result.httpCode);
        } catch (error) {
            next(error);
        }
    }
);

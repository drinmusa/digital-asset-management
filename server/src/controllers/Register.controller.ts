import { NextFunction, Request, Response, Router } from 'express';

// middleware
import { ValidationMiddleware } from '../middleware/Validation.middleware';

// service
import { RegisterService } from '../services/Register.service';

// validator
import { RegisterValidator } from '../validators/Register.validator';

export const RegisterController: Router = Router();

RegisterController.post(
    '/',
    ValidationMiddleware(RegisterValidator, {}, (req: Request) => req.body),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, name, password } = req.body;
            const result = await RegisterService.register(email, name, password);
            res.send(result.data).status(result.httpCode);
        } catch (error) {
            next(error);
        }
    }
);

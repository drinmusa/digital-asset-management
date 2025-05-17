import { Router, Request, Response, NextFunction } from 'express';
import { ValidationMiddleware } from '../middleware/Validation.middleware';
import { WarrantyQuoteValidator } from '../validators/WarrantyQuoteValidator';
import { WarrantyService } from '../services/Warranty.service';
import { authMiddleware } from '../middleware/Authentication.middleware';
import { IdValidator } from '../validators/Id.validator';
import { PaginationValidator } from '../validators/Pagination.validator';
import { accessMiddleware } from '../middleware/Access.middleware';

export const WarrantyController: Router = Router();
WarrantyController.get(
    '/',
    authMiddleware,
    accessMiddleware('ADMIN'),
    ValidationMiddleware(PaginationValidator, {}, (req: Request) => req.query),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const userId = Number(req.user.id);

            const result = await WarrantyService.read({ page, limit, userId });

            res.status(result.httpCode).send(result.data);
        } catch (error) {
            next(error);
        }
    }
);
WarrantyController.get(
    '/get-quote/:id',
    authMiddleware,
    ValidationMiddleware(IdValidator, {}, (req: Request) => req.params),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const result = await WarrantyService.getQuote(Number(id));
            res.status(result.httpCode).send(result.data);
        } catch (err) {
            next(err);
        }
    }
);

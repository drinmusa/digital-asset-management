import { Request, Response, Router, NextFunction } from 'express';
import { ValidationMiddleware } from '../middleware/Validation.middleware';
import { CreateAssetValidator } from '../validators/Asset.validator';
import { AssetService } from '../services/Asset.service';
import { authMiddleware } from '../middleware/Authentication.middleware';
import { PaginationValidator } from '../validators/Pagination.validator';
import { IdValidator } from '../validators/Id.validator';

export const AssetController: Router = Router();

AssetController.post(
    '/',
    authMiddleware,
    ValidationMiddleware(CreateAssetValidator, {}, (req: Request) => req.body),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const result = await AssetService.create({ ...data, userId: req.user.id });
            res.send(result.data).status(result.httpCode);
        } catch (error) {
            next(error);
        }
    }
);
// GET /assets?page=1&limit=10 - List assets (paginated)
AssetController.get(
    '/',
    authMiddleware,
    ValidationMiddleware(PaginationValidator, {}, (req: Request) => req.query),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const userId = Number(req.user.id);

            const result = await AssetService.read({ page, limit, userId });

            res.status(result.httpCode).send(result.data);
        } catch (error) {
            next(error);
        }
    }
);
AssetController.get(
    '/:id',
    authMiddleware,
    ValidationMiddleware(IdValidator, {}, (req) => req.params),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const result = await AssetService.readById(id);
            res.status(result.httpCode).send(result.data);
        } catch (error) {
            next(error);
        }
    }
);

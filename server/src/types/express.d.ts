// src/types/express/index.d.ts
import { UserModel } from '../interfaces/models';
declare global {
    namespace Express {
        interface Request {
            user?: Partial<UserModel>; // Ensure consistency with verifyToken return type
        }
    }
}

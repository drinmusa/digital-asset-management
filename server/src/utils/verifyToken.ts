import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt';
import { UserModel } from '../interfaces/models/User.model';
export const verifyToken = (token: string): Partial<UserModel> | null => {
    try {
        // return jwt.verify(token, JWT_SECRET) as Partial<UserModel>;
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

        if (!decoded.userId) return null; // Ensure userId exists in payload

        return { id: decoded.userId }; // Adjust based on your JWT structure
    } catch (error) {
        return null; // Token is invalid or expired
    }
};

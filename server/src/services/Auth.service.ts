import jwt, { JwtPayload } from 'jsonwebtoken';

import { ok, failure } from '../utils/responses';
import prisma from '../lib/prisma';

import { JWT_SECRET } from '../config/jwt';
import { StatusCodeEnums } from '../interfaces/enums/StatusCode.enums';

export const AuthService = {
    verifyToken: async (token: string) => {
        try {
            const decoded = jwt.verify(token, JWT_SECRET!) as JwtPayload | string;
            if (typeof decoded === 'string') {
                return failure('Invalid token payload', StatusCodeEnums.INVALID_TOKEN);
            }

            const { userId } = decoded;
            const user = await prisma.user.findUnique({ where: { id: Number(userId) } });

            return ok({ valid: true, user: decoded, role: user?.role });
        } catch (error) {
            return failure('Invalid or expired token', StatusCodeEnums.INVALID_TOKEN);
        }
    }
};

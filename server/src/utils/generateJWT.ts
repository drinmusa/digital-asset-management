import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_ALGORITHM } from '../config/jwt';

export const generateJWT = (id: number) => {
    const payload = { userId: id.toString() };

    return jwt.sign(payload, JWT_SECRET, { algorithm: JWT_ALGORITHM, expiresIn: '1h' });
};

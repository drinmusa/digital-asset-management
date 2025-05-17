import { Algorithm } from 'jsonwebtoken';

// Type-safe environment parsing
const secret = process.env.JWT_SECRET;
// const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
const expiresIn = process.env.JWT_EXPIRES_IN;
const algorithm = (process.env.JWT_ALGORITHM || 'HS256') as Algorithm;

if (!secret) {
    throw new Error('JWT_SECRET is not defined in the environment');
}

export const JWT_SECRET: string = secret;
export const JWT_EXPIRES_IN = expiresIn;
export const JWT_ALGORITHM: Algorithm = algorithm;

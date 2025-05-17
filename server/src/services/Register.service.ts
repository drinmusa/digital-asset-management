import prisma from '../lib/prisma';
import { ok, failure } from '../utils/responses';
import { hashPassword } from '../utils/hashPassword';
import { StatusCodeEnums } from '../interfaces/enums/StatusCode.enums';

export const RegisterService = {
    register: async (email: string, name: string, password: string) => {
        try {
            // Check if email is already taken
            const existingUser = await prisma.user.findUnique({ where: { email } });

            if (existingUser) {
                return failure('Email is already in use', StatusCodeEnums.EMAIL_ALREADY_EXISTS);
            }

            // Hash password
            const hashedPassword = await hashPassword(password);

            // Create user
            const user = await prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                    role: 'USER'
                }
            });

            // Optionally exclude password from response
            const { password: _, ...userWithoutPassword } = user;

            return ok({
                message: 'User registered successfully',
                user: userWithoutPassword
            });
        } catch (error) {
            return failure({ message: 'Registration failed', error });
        }
    }
};

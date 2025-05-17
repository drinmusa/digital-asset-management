import { ok, failure } from '../utils/responses';
import prisma from '../lib/prisma';
import { StatusCodeEnums } from '../interfaces/enums/StatusCode.enums';
import { generateJWT } from '../utils/generateJWT';
export const LoginService = {
    login: async (email: string, password: string) => {
        try {
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) {
                return failure('Invalid credentials', StatusCodeEnums.INVALID_CREDENTIALS);
            }
            return ok({
                message: 'Login successful',
                token: generateJWT(user.id),
                role: user.role
            });
        } catch (error) {
            return failure({ 'Something went wrong': error });
        }
    }
};

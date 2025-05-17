import prisma from '../lib/prisma';
import { ok, failure } from '../utils/responses';
import { StatusCodeEnums } from '../interfaces/enums/StatusCode.enums';

export const AssetService = {
    create: async (data: { name: string; category: string; purchaseDate: Date; value: number; userId: string }) => {
        try {
            const purchaseDate = new Date(data.purchaseDate);
            const userId = Number(data.userId);
            const asset = await prisma.asset.create({
                data: {
                    name: data.name,
                    category: data.category,
                    purchaseDate,
                    value: data.value,
                    userId
                }
            });

            return ok({
                message: 'Asset created successfully',
                asset
            });
        } catch (error) {
            return failure({ 'Something went wrong': error }, StatusCodeEnums.UNEXPECTED);
        }
    },
    read: async ({ page = 1, limit = 10, userId }: { page?: number; limit?: number; userId: number }) => {
        try {
            const skip = (page - 1) * limit;

            const [assets, total] = await Promise.all([
                prisma.asset.findMany({
                    where: { userId },
                    skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' }
                }),
                prisma.asset.count({ where: { userId } })
            ]);

            return ok({
                message: 'Assets fetched successfully',
                data: assets,
                pagination: {
                    total,
                    page,
                    limit,
                    pages: Math.ceil(total / limit)
                }
            });
        } catch (error) {
            return failure({ 'Something went wrong': error }, StatusCodeEnums.UNEXPECTED);
        }
    },
    readById: async (id: number) => {
        try {
            const asset = await prisma.asset.findUnique({
                where: { id }
            });

            if (!asset) {
                return failure({ message: 'Asset not found' }, StatusCodeEnums.NOT_FOUND);
            }

            return ok({
                message: 'Asset fetched successfully',
                data: asset
            });
        } catch (error) {
            return failure({ 'Something went wrong': error }, StatusCodeEnums.UNEXPECTED);
        }
    }
};

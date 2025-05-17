import { ok, failure } from '../utils/responses';
import prisma from '../lib/prisma';
import { StatusCodeEnums } from '../interfaces/enums/StatusCode.enums';

const categoryRates: Record<string, number> = {
    electronics: 0.05,
    furniture: 0.03,
    vehicle: 0.07
    // add your categories and rates here
};

export const WarrantyService = {
    getQuote: async (assetId: number) => {
        try {
            // Find the asset by ID
            const asset = await prisma.asset.findUnique({ where: { id: assetId } });

            if (!asset) {
                return failure('Asset not found', StatusCodeEnums.NOT_FOUND);
            }

            // Determine rate based on asset category
            const category = asset.category?.toLowerCase() ?? '';
            const rate = categoryRates[category] ?? 0.01; // Default 1%
            const quoteAmount = parseFloat((asset.value * rate).toFixed(2));
            const validUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

            // Check if warranty already exists for this asset (allow only one saved quote)
            const warrantyExists = await prisma.warranty.findFirst({
                where: { assetId: assetId }
            });

            // Save warranty only if it doesn't exist yet
            if (!warrantyExists) {
                await prisma.warranty.create({
                    data: {
                        assetId: asset.id,
                        quoteAmount,
                        providerName: 'SimulatedWarranty Inc.',
                        validUntil
                    }
                });
            }

            // Return the quote info regardless of whether saved or not
            return ok({
                assetId: asset.id,
                quoteAmount,
                providerName: 'SimulatedWarranty Inc.',
                validUntil
            });
        } catch (error) {
            return failure({ 'Something went wrong': error }, StatusCodeEnums.UNEXPECTED);
        }
    },
    read: async ({ page = 1, limit = 10, userId }: { page?: number; limit?: number; userId: number }) => {
        try {
            const skip = (page - 1) * limit;

            // Fetch warranties joined with assets owned by the user
            const [warranties, total] = await Promise.all([
                prisma.warranty.findMany({
                    where: {
                        asset: {
                            userId: userId // filter warranties whose asset belongs to the user
                        }
                    },
                    skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' },
                    include: {
                        asset: true // include asset details if needed
                    }
                }),
                prisma.warranty.count({
                    where: {
                        asset: {
                            userId: userId
                        }
                    }
                })
            ]);

            return ok({
                message: 'Warranties fetched successfully',
                data: warranties,
                pagination: {
                    total,
                    page,
                    limit,
                    pages: Math.ceil(total / limit)
                }
            });
        } catch (error) {
            console.error('Error fetching warranties:', error);
            return failure({ 'Something went wrong': error }, StatusCodeEnums.UNEXPECTED);
        }
    }
};

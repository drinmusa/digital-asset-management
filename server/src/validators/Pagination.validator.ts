import Joi from 'joi';

export const PaginationValidator = Joi.object({
    page: Joi.number().integer().min(1).optional().label('Page'),
    limit: Joi.number().integer().min(1).optional().label('Limit')
}).unknown(false); // Disallow any unknown query params

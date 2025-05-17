import Joi from 'joi';

export const IdValidator = Joi.object({
    id: Joi.number().integer().min(1).optional().label('Id')
}).unknown(false); // Disallow any unknown query params

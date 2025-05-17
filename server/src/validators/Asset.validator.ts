import Joi from 'joi';

export const CreateAssetValidator = Joi.object({
    name: Joi.string().trim().min(2).max(100).required().label('Name'),
    category: Joi.string().trim().min(2).max(50).required().label('Category'),
    purchaseDate: Joi.date().required().label('Purchase Date'),
    value: Joi.number().positive().precision(2).required().label('Value')
});

import Joi from 'joi';

export const WarrantyQuoteValidator = Joi.object({
    id: Joi.string().uuid().required() // or Joi.number() if using numbers
});

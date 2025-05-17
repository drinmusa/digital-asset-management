import Joi from 'joi';

export const RegisterValidator = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .trim()
        .required()
        .label('Email'),
    name: Joi.string().trim().min(2).required().label('Name'),
    password: Joi.string().trim().min(8).required().label('Password')
});

import Joi from 'joi';

export const loginBodySchema = Joi.object({
  phone: Joi.string()
    .required()
    .pattern(/^\d{11}$/),
  code: Joi.string()
    .required()
    .pattern(/^\d{6}$/),
});

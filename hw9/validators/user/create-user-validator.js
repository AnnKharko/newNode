const Joi = require('joi');

const { regexpEnum } = require('../../constant');

module.exports = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(24)
        .required(),
    // email: Joi.string()
        // .regex(regexpEnum.EMAIL_REGEXP)
        // .required(),
    age: Joi.number().required().max(100).min(16),
    gender: Joi.string().required(),
    isMarried: Joi.boolean(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .regex(regexpEnum.PASSWORD_REGEXP)
        .required()
});

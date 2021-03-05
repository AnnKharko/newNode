const Joi = require('joi');

const { regexpEnum } = require('../../constant');

module.exports = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(24)
        .required(),
    email: Joi.string()
        .regex(regexpEnum.EMAIL_REGEXP)
        .required(),
    // email: Joi.string().email()
    password: Joi.string()
        .regex(regexpEnum.PASSWORD_REGEXP)
        .required()
});

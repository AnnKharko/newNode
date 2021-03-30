const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(24)
        .required(),
    age: Joi.number().required().max(100).min(16),
    gender: Joi.string().required(),
});

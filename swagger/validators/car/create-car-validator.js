const Joi = require('joi');

const { constants } = require('../../constant');

module.exports = Joi.object({
    producer: Joi.string()
        .min(3)
        .max(24)
        .required(),
    model: Joi.string()
        .alphanum()
        .required(),
    year: Joi.number()
        .integer()
        .required()
        .min(constants.CURRENT_YEAR - 100)
        .max(constants.CURRENT_YEAR),
    price: Joi.number()
        .integer()
        .min(100)
        .max(5000000),
    color: Joi.string()
        .min(3)
        .max(24),
    owner: Joi.string()
});

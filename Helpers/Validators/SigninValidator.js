const Joi = require('joi')

const SigninSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
});

module.exports = SigninSchema;
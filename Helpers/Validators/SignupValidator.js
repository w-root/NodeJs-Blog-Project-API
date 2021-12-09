const Joi = require('joi')

const SignupSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
});

module.exports = SignupSchema;
const Joi = require('joi')

const SigninSchema = Joi.object({
    title: Joi.string().min(5).required()  // Post modelinin diğer özelliklerine de yazılabilir 
})

module.exports = SigninSchema
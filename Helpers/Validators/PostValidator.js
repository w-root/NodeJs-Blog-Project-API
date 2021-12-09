const Joi = require('joi')

const SigninSchema = Joi.object({
    title: Joi.string().min(5).required()   // Post modelinin diğer özelliklerine de yazılabilir 
});                                         // örnek olması açısından ben 1 tane yaptım

module.exports = SigninSchema;
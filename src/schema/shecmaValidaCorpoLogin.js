const joi = require('joi')

const schemaValidaCorpoLogin = joi.object({
    email: joi.string().email().required().messages({
        'any.required': 'O campo e-mail é obrigatório',
        'string.email': 'O campo e-mail deve ser um e-mail válido',
        'string.empty': 'O campo e-mail não pode ser vazio'
    }),
    senha: joi.string().min(5).required().messages({
        'any.required': 'O campo senha é obrigatório',
        'string.min': 'O campo senha deve ter no mínimo 5 caracteres',
        'string.empty': 'O campo senha não pode ser vazio'
    })
})

module.exports = schemaValidaCorpoLogin
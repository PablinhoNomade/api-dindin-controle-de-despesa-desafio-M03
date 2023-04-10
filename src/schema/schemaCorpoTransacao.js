const joi = require('joi')
const SchemaCorpoTransacao = joi.object({
    tipo: joi.string().valid('entrada', 'saida').required().messages({
        'any.required': 'O campo tipo é obrigatório',
        'string.empty': 'O campo tipo não pode ser vazio',
        'any.only': 'O campo tipo deve ser entrada ou saida'
    }),
    descricao: joi.string().required().messages({
        'any.required': 'O campo descrição é obrigatório',
        'string.empty': 'O campo descrição não pode ser vazio'
    }),
    valor: joi.number().positive().required().messages({
        'any.required': 'O campo valor é obrigatório',
        'number.positive': 'O campo valor deve ser positivo'
    }),
    data: joi.date().required().messages({
        'any.required': 'O campo data é obrigatório',
        'date.base': 'O campo data deve ser uma data válida'
    }),
    categoria_id: joi.number().positive().required().messages({
        'any.required': 'O campo categoria é obrigatório',
        'number.base': 'O campo categoria deve ser um número',
        'number.positive': 'O campo categoria deve ser positivo'
    })
})

module.exports = SchemaCorpoTransacao
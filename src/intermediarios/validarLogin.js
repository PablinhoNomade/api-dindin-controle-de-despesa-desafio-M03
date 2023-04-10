const jwt = require('jsonwebtoken')
const knex = require('../conexao-banco-de-dados/conexao')

const validarLogin = async (req, res, next) => {
    const { authorization } = req.headers 

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado' })
    }

       const token = authorization.split(' ')[1];

    try {
        
        const { id } = jwt.verify(token, process.env.SENHA_JWT)  

       
        const validacaoUsuario = await knex('usuarios').where({ id }).first()
        
        if (!validacaoUsuario) {
            return res.status(401).json({ mensagem: 'Não autorizado' })
        }
        //desetrutura o rows o usuario dentro da requisição conforme exemplo abaixo:
        const { senha, ...usuario } = validacaoUsuario
        req.usuario = usuario

        next()
    } catch (error) {
        return res.status(401).json({ mensagem: 'Não autorizado!!!' })
    }
}

module.exports = validarLogin

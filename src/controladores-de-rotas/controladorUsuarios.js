//REQUERENDO AS BIBLIOTECAS A SEREM USADAS NO PROJETO
const knex = require('../conexao-banco-de-dados/conexao')
const bcrypt = require('bcrypt')

const cadastroUsuario = async (req, res) => {

    const { nome, email, senha } = req.body;

    try {
        const verificandoEmail = await knex('usuarios').where({ email }).first()

        if (verificandoEmail) {
            return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' })
        }
        const criptografiaSenha = await bcrypt.hash(senha, 10)

        const usuarioCadastrado = await knex('usuarios').insert({ nome, email, senha: criptografiaSenha }).returning('*')

        const { senha: _, ...usuario } = usuarioCadastrado[0]

        return res.status(201).json(usuario)

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const detalharUsuario = async (req, res) => {

    return res.json(req.usuario)
}

const atualizacaoCadastro = async (req, res) => {

    const { nome, email, senha } = req.body

    try {

                const criptografiaSenha = await bcrypt.hash(senha, 10)

        
        const verificandoEmail = await knex('usuarios').where({email}).first()

        if (!verificandoEmail || verificandoEmail.id === req.usuario.id && verificandoEmail.email === req.usuario.email) {

            await knex('usuarios').where({ id: req.usuario.id }).update({ nome, email, senha: criptografiaSenha })

        } else {

            return res.status(401).json({ mensagem: 'O e-mail informado á esta sendo utilizado por outro usuario' })
        }

        return res.status(204).send()

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = {
    cadastroUsuario,
    detalharUsuario,
    atualizacaoCadastro
}
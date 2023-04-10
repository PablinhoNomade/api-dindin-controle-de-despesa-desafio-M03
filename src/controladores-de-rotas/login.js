const knex = require('../conexao-banco-de-dados/conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { email, senha } = req.body

    try {
        const usuario = await knex('usuarios').where({ email }).first()
        if (!usuario) {
            return res.status(400).json({ mensagem: 'Usuário e/ou senha inválido(s).' })
        }

        const { senha: _, ...usuarioAutorizado } = usuario

        const senhaAutenticada = await bcrypt.compare(senha, usuario.senha)

        if (!senhaAutenticada) {
            return res.status(400).json({ mensagem: 'Usuário e/ou senha inválido(s).' })
        }

        const token = jwt.sign({ id: usuario.id }, process.env.SENHA_JWT, { expiresIn: '12h' })

        return res.json({ usuario: usuarioAutorizado, token })


    } catch (error) {
        return res.status(401).json({ mensagem: `Não autorizado` })
    }
}

module.exports = {
    login
}
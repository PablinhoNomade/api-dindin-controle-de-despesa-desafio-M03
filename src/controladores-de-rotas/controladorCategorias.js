//requerendo biblioteca para manipular o banco de dados
const knex = require('../conexao-banco-de-dados/conexao')

//Função listar categorias
const listarCategorias = async (req, res) => {

    try {
        const categorias = await knex('categorias').returning('*')
        return res.status(201).json(categorias)

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = {
    listarCategorias
}
const knex = require('../conexao-banco-de-dados/conexao')

const cadastrarTransacao = async (req, res) => {
    const { tipo, descricao, valor, data, categoria_id } = req.body

    try {

        const categoriaIdExiste = await knex('categorias').where({ id: categoria_id }).first()

        if (!categoriaIdExiste) {
            return res.status(404).json({ mensagem: 'A categoria informada é inexistente' })
        }

        const transacaoCadastrada = await knex('transacoes').insert({ descricao, valor, data, categoria_id, tipo, usuario_id: req.usuario.id }).returning('*')

        const resultado = {
            ...transacaoCadastrada[0],
            categoria_nome: categoriaIdExiste.descricao
        }

        return res.status(201).json(resultado)

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno servidor' })
    }
}

const listarTransacoesUsuario = async (req, res) => {

    const { filtro } = req.query

    try {

        let resultado = []

        if (!filtro) {

            const transacoesUsuario = await knex('transacoes').where({ usuario_id: req.usuario.id }).select('transacoes.id', 'tipo', 'transacoes.descricao', 'valor', 'data', 'usuario_id', 'categoria_id').innerJoin('categorias', 'categorias.id', 'transacoes.categoria_id').select('categorias.descricao as categoria_nome')

            return res.json(transacoesUsuario)
        }

        if (typeof (filtro) == "object") {
            for (let item of filtro) {

                const transacoesUsuario = await knex('transacoes').where({ usuario_id: req.usuario.id }).select('transacoes.id', 'tipo', 'transacoes.descricao', 'valor', 'data', 'usuario_id', 'categoria_id').innerJoin('categorias', 'categorias.id', 'transacoes.categoria_id').select('categorias.descricao as categoria_nome').whereILike('categorias.descricao', `%${item}%`)

                resultado.push(...transacoesUsuario)
            }
        } else {

            const transacoesUsuario = await knex('transacoes').where({ usuario_id: req.usuario.id }).select('transacoes.id', 'tipo', 'transacoes.descricao', 'valor', 'data', 'usuario_id', 'categoria_id').innerJoin('categorias', 'categorias.id', 'transacoes.categoria_id').select('categorias.descricao as categoria_nome').whereILike('categorias.descricao', `%${filtro}%`)

            resultado = transacoesUsuario
        }

        return res.json(resultado)

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno servidor' })
    }
}

const detalharTransacoesUsuario = async (req, res) => {

    const { id } = req.params

    try {

        const transacoesUsuario = await knex('transacoes').where({ 'transacoes.id': id }).select('transacoes.id', 'tipo', 'transacoes.descricao', 'valor', 'data', 'usuario_id', 'categoria_id').innerJoin('categorias', 'categorias.id', 'transacoes.categoria_id').select('categorias.descricao as categoria_nome').first()

        return res.json(transacoesUsuario)

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno servidor' })
    }
}

const atualizarTransacao = async (req, res) => {

    const { id } = req.params
    const { descricao, valor, data, categoria_id, tipo } = req.body

    try {

        await knex('transacoes').where({ id }).update({ descricao, valor, data, categoria_id, tipo })
        return res.status(204).send()

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno servidor' })
    }
}

const excluirTransacao = async (req, res) => {
    const { id } = req.params

    try {
        await knex('transacoes').where({ id }).del()

        return res.status(204).send()

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno servidor' })
    }
}

const extratoTransacoes = async (req, res) => {

    try {

        const entradas = await knex('transacoes').where({ tipo: 'entrada', usuario_id: req.usuario.id }).sum('valor').as('entrada')

        const saidas = await knex('transacoes').where({ tipo: 'saida', usuario_id: req.usuario.id }).sum('valor').as('saida')

        console.log(entradas)
        const extrato = {
            entrada: entradas[0].sum ?? 0,
            saida: saidas[0].sum ?? 0
        }

        return res.json(extrato)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno servidor' })
    }
}

module.exports = {
    cadastrarTransacao,
    listarTransacoesUsuario,
    detalharTransacoesUsuario,
    atualizarTransacao,
    excluirTransacao,
    extratoTransacoes,
}
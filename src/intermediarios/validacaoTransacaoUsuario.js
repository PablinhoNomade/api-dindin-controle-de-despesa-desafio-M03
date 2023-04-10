const knex = require('../conexao-banco-de-dados/conexao')

const validacaoIdTransacao = async (req, res, next) => {
    const { id } = req.params


    try {
        const selectId = await knex('transacoes').where({ id }).select('id', 'usuario_id').first()


        if (!selectId) {
            return res.status(404).json({ mensagem: 'Transação não encontrada' })
        }

        if (selectId.usuario_id !== req.usuario.id) {
            return res.status(401).json({ mensagem: 'Transação não autorizada' })
        }
        next()

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno servidor' })
    }

}

module.exports = {
    validacaoIdTransacao
}
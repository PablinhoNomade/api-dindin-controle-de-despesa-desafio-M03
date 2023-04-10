//valida campos obrigatórios dos controladores de transação
const validaCorpoTransacao = joiSchema => async (req, res, next) => {

    const { descricao, valor, data, categoria_id, tipo } = req.body

    try {
        await joiSchema.validateAsync(req.body)

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
    next()
}

module.exports = {
    validaCorpoTransacao
}
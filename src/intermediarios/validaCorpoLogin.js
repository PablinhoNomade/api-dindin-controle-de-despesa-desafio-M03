const validaCorpoLogin = joiSchema => async (req, res, next) => {
    const { email, senha } = req.body

    try {
        await joiSchema.validateAsync(req.body)

    } catch (error) {
        return res.status(400).json({ mensagem: 'O campo e-mail deve existir e ser preenchidos' })
    }
   next()
}

module.exports = validaCorpoLogin
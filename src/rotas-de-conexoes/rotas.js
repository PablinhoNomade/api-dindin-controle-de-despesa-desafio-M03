const express = require('express')

const { listarCategorias } = require('../controladores-de-rotas/controladorCategorias')
const { cadastrarTransacao, listarTransacoesUsuario, extratoTransacoes, detalharTransacoesUsuario, atualizarTransacao, excluirTransacao } = require('../controladores-de-rotas/controladorTransacoes')
const { cadastroUsuario, detalharUsuario, atualizacaoCadastro } = require('../controladores-de-rotas/controladorUsuarios')
const { login } = require('../controladores-de-rotas/login')
const validaCorpoCadastroUsuarios = require('../intermediarios/validacaoCorpoCadastroUsuario')
const { validaCorpoTransacao } = require('../intermediarios/validacaoCorpoTransacao')
const { validacaoIdTransacao } = require('../intermediarios/validacaoTransacaoUsuario')
const validaCorpoLogin = require('../intermediarios/validaCorpoLogin')
const validarLogin = require('../intermediarios/validarLogin')
const SchemaCorpoTransacao = require('../schema/schemaCorpoTransacao')
const schemaValidaCorpoCadastroUsuario = require('../schema/shecmaValidaCorpoCadastroUsuario')
const schemaValidaCorpoLogin = require('../schema/shecmaValidaCorpoLogin')

const rotas = express.Router();

rotas.post('/usuario', validaCorpoCadastroUsuarios(schemaValidaCorpoCadastroUsuario), cadastroUsuario)
rotas.post('/login', validaCorpoLogin(schemaValidaCorpoLogin), login)

rotas.use(validarLogin)

rotas.get('/usuario', detalharUsuario)
rotas.put('/usuario', validaCorpoCadastroUsuarios(schemaValidaCorpoCadastroUsuario), atualizacaoCadastro)
rotas.get('/categoria', listarCategorias)
rotas.post('/transacao', validaCorpoTransacao(SchemaCorpoTransacao), cadastrarTransacao)
rotas.get('/transacao', listarTransacoesUsuario)
rotas.get('/transacao/extrato', extratoTransacoes)
rotas.get('/transacao/:id', validacaoIdTransacao, detalharTransacoesUsuario)
rotas.put('/transacao/:id', validacaoIdTransacao, validaCorpoTransacao(SchemaCorpoTransacao), atualizarTransacao)
rotas.delete('/transacao/:id', validacaoIdTransacao, excluirTransacao)

module.exports = rotas;
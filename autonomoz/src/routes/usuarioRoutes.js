const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// 1. Autenticação e rota customizada
router.post('/login', usuarioController.login);
router.get('/cargos', usuarioController.buscarCargos);

// 2. Rotas CRUD padrão
router.get('/', usuarioController.listar);
router.get('/:id', usuarioController.buscarPorId);
router.post('/', usuarioController.cadastrar);
router.put('/:id', usuarioController.atualizar);
router.delete('/:id', usuarioController.excluir);

module.exports = router;
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// 1. Rota de autenticação/login (DEVE vir antes de /:id)
router.post('/login', usuarioController.login.bind(usuarioController));

// 2. Rotas gerais de listagem e criação
router.get('/', usuarioController.getAll.bind(usuarioController));
router.post('/', usuarioController.create.bind(usuarioController));

// 3. Rotas com parâmetro :id
router.get('/:id', usuarioController.getById.bind(usuarioController));
router.patch('/:id', usuarioController.update.bind(usuarioController));
router.put('/:id', usuarioController.update.bind(usuarioController));
router.delete('/:id', usuarioController.delete.bind(usuarioController));

module.exports = router;
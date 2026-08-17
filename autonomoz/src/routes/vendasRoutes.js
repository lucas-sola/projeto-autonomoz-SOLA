const express = require('express');
const router = express.Router();
const vendasController = require('../controllers/vendasController');

router.get('/', vendasController.listar);
router.get('/:id', vendasController.buscarPorId);
router.post('/', vendasController.cadastrar);
router.put('/:id', vendasController.atualizar);
router.delete('/:id', vendasController.excluir);

module.exports = router;

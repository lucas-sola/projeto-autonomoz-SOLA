const express = require('express');
const router = express.Router();
const movimentacaoController = require('../controllers/movimentacaoController');

router.get('/', movimentacaoController.listar);
router.get('/:id', movimentacaoController.buscarPorId);
router.post('/', movimentacaoController.cadastrar);
router.put('/:id', movimentacaoController.atualizar);
router.delete('/:id', movimentacaoController.excluir);

module.exports = router;

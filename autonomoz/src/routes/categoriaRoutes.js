const express = require('express');
const router = express.Router();
const categoriaService = require('../services/categoriaService');

router.get('/', categoriaService.listar);
router.get('/:id', categoriaService.buscarPorId);
router.post('/', categoriaService.cadastrar);
router.put('/:id', categoriaService.atualizar);
router.delete('/:id', categoriaService.excluir);

module.exports = router;
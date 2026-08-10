const express = require('express');
const router = express.Router();

// Importação de todas as rotas mapeadas na documentação
const usuarioRoutes = require('./usuarioRoutes');
// const cargoRoutes = require('./cargoRoutes');
// const categoriaRoutes = require('./categoriaRoutes');
// const fornecedorRoutes = require('./fornecedorRoutes');
// const localizacaoRoutes = require('./localizacaoRoutes');
// const produtoRoutes = require('./produtoRoutes');
// const loteRoutes = require('./loteRoutes');
// const movimentacaoRoutes = require('./movimentacaoRoutes');
// const ordemProducaoRoutes = require('./ordemProducaoRoutes');
// const ordemProducaoFuncionarioRoutes = require('./ordemProducaoFuncionarioRoutes');
// const subcategoriaRoutes = require('./subcategoriaRoutes');


// // 🔍 DIAGNÓSTICO: Vamos ver o que cada import trouxe
// console.log('--- TESTANDO AS ROTAS ---');
// console.log('usuarioRoutes:', typeof usuarioRoutes);
// console.log('cargoRoutes:', typeof cargoRoutes);
// console.log('categoriaRoutes:', typeof categoriaRoutes);
// console.log('fornecedorRoutes:', typeof fornecedorRoutes);
// console.log('localizacaoRoutes:', typeof localizacaoRoutes);
// console.log('produtoRoutes:', typeof produtoRoutes);
// console.log('loteRoutes:', typeof loteRoutes);
// console.log('movimentacaoRoutes:', typeof movimentacaoRoutes);
// console.log('ordemProducaoRoutes:', typeof ordemProducaoRoutes);
// console.log('ordemProducaoFuncionarioRoutes:', typeof ordemProducaoFuncionarioRoutes);
// console.log('subcategoriaRoutes:', typeof subcategoriaRoutes);
// console.log('-------------------------');


// Definição dos caminhos base para cada módulo conforme a documentação técnica
router.use('/usuarios', usuarioRoutes);
// router.use('/cargos', cargoRoutes);
// router.use('/categorias', categoriaRoutes);
// router.use('/fornecedores', fornecedorRoutes);
// router.use('/localizacao', localizacaoRoutes);
// router.use('/produtos', produtoRoutes);
// router.use('/lotes', loteRoutes);
// router.use('/movimentacoes', movimentacaoRoutes);
// router.use('/ordem_producao', ordemProducaoRoutes);
// router.use('/ordem_producao_funcionario', ordemProducaoFuncionarioRoutes);
// router.use('/subcategoria', subcategoriaRoutes);

module.exports = router;
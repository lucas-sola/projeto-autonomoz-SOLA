const db = require('../config/database');

class ProdutoRepository {
    // Busca todos os produtos na tabela
    async listarTodos() {
        const sql = 'SELECT * FROM Produto';
        return db.query(sql);
    }

    // Busca um produto específico pelo ID
    async buscarPorId(id) {
        const sql = 'SELECT * FROM PRODUTO WHERE id_produto = ?';
        return db.query(sql, [id]);
    }

    // Insere um novo produto conforme a modelagem
    async salvar(produto) {
        const { nome_produto, descricao, estoque_minimo } = produto;
        const sql = 'INSERT INTO PRODUTO (nome_produto, descricao, estoque_minimo) VALUES (?, ?, ?)';
        return db.query(sql, [nome_produto, descricao, estoque_minimo]);
    }

    // Atualiza os dados de um produto existente
    async atualizar(id, produto) {
        const { nome_produto, descricao, estoque_minimo } = produto;
        const sql = 'UPDATE PRODUTO SET nome_produto = ?, descricao = ?, estoque_minimo = ? WHERE id_produto = ?';
        return db.query(sql, [nome_produto, descricao, estoque_minimo, id]);
    }

    // Remove o registro do produto
    async excluir(id) {
        const sql = 'DELETE FROM PRODUTO WHERE id_produto = ?';
        return db.query(sql, [id]);
    }
}

module.exports = new ProdutoRepository();
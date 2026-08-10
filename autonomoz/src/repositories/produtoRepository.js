const db = require('../config/database');

class ProdutoRepository {
    // Busca todos os produtos na tabela - Nome correto: 'Produto' [1]
    async listarTodos() {
        const sql = 'SELECT * FROM Produto';
        const [linhas] = await db.query(sql); // Desestrutura para pegar só os dados
        return linhas;
    }

    // Busca um produto específico pelo ID
    async buscarPorId(id) {
        const sql = 'SELECT * FROM Produto WHERE id_produto = ?';
        const [linhas] = await db.query(sql, [id]);
        return linhas; // Retorna o array de resultados (o service tratará se está vazio)
    }

    // Insere um novo produto - Adicionado o campo obrigatório 'codigo_item' [1, 2]
    async salvar(produto) {
        const { codigo_item, nome_produto, descricao, estoque_minimo } = produto;
        const sql = 'INSERT INTO Produto (codigo_item, nome_produto, descricao, estoque_minimo) VALUES (?, ?, ?, ?)';
        
        // Retorna o resultado para que o Controller acesse o 'insertId'
        const [resultado] = await db.query(sql, [codigo_item, nome_produto, descricao, estoque_minimo]);
        return resultado;
    }

    // Atualiza os dados de um produto existente
    async atualizar(id, produto) {
        const { nome_produto, descricao, estoque_minimo } = produto;
        const sql = 'UPDATE Produto SET nome_produto = ?, descricao = ?, estoque_minimo = ? WHERE id_produto = ?';
        const [resultado] = await db.query(sql, [nome_produto, descricao, estoque_minimo, id]);
        return resultado;
    }

    // Remove o registro do produto
    async excluir(id) {
        const sql = 'DELETE FROM Produto WHERE id_produto = ?';
        const [resultado] = await db.query(sql, [id]);
        return resultado;
    }
}

module.exports = new ProdutoRepository();
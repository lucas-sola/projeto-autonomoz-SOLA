const produtoService = require('../services/produtoService');

class ProdutoController {
    /**
     * GET /produtos
     * Acessar todos os produtos cadastrados.
     */
    async listar(req, res) {
        try {
            const produtos = await produtoService.listarTodos();
            res.status(200).json(produtos);
        } catch (erro) {
            res.status(500).json({ mensagem: 'Erro ao buscar produtos.' });
        }
    }

    /**
     * GET /produtos/:id
     * Acessar um produto específico pelo ID.
     */
    async buscarPorId(req, res) {
        const { id } = req.params;
        try {
            const produto = await produtoService.buscarPorId(id);
            res.status(200).json(produto);
        } catch (erro) {
            // Caso o service lance erro de "não encontrado"
            res.status(404).json({ mensagem: erro.message });
        }
    }

    /**
     * POST /produtos
     * Criar um novo produto no sistema.
     * Campos: nome_produto, descricao, estoque_minimo.
     */
    async cadastrar(req, res) {
        try {
            const resultado = await produtoService.cadastrar(req.body);
            
            // Retorna Status 201 (Created) conforme a documentação [4]
            res.status(201).json({ 
                ID_produto: resultado.insertId, // ID gerado pelo banco
                nome_produto: req.body.nome_produto,
                descricao: req.body.descricao,
                estoque_minimo: req.body.estoque_minimo
            });
        } catch (erro) {
            res.status(400).json({ mensagem: erro.message });
        }
    }

    /**
     * PUT /produtos/:id
     * Alterar dados de um produto existente.
     */
    async atualizar(req, res) {
        const { id } = req.params;
        try {
            await produtoService.atualizar(id, req.body);
            res.status(200).json({ mensagem: 'Produto atualizado com sucesso.' });
        } catch (erro) {
            res.status(400).json({ mensagem: erro.message });
        }
    }

    /**
     * DELETE /produtos/:id
     * Deletar produto do sistema.
     */
    async excluir(req, res) {
        const { id } = req.params;
        try {
            await produtoService.excluir(id);
            res.status(200).json({ mensagem: 'Produto removido com sucesso.' });
        } catch (erro) {
            res.status(400).json({ mensagem: erro.message });
        }
    }
}
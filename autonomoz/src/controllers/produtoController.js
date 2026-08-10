const produtoRepository = require('../repositories/produtoRepository');

class ProdutoController {
    // GET /produtos
    async listar(req, res) {
        try {
            const [linhas] = await produtoRepository.listarTodos();
            res.status(200).json(linhas);
        } catch (erro) {
            res.status(500).json({ mensagem: 'Erro ao buscar produtos' });
        }
    }

    // GET /produtos/:id
    async buscarPorId(req, res) {
        const { id } = req.params;
        try {
            const [linhas] = await produtoRepository.buscarPorId(id);
            if (linhas.length === 0) return res.status(404).json({ mensagem: 'Produto não encontrado' });
            res.status(200).json(linhas);
        } catch (erro) {
            res.status(500).json({ mensagem: 'Erro ao buscar produto' });
        }
    }

    // POST /produtos
    async cadastrar(req, res) {
        try {
            const resultado = await produtoRepository.salvar(req.body);
            // Retorna 201 (Created) conforme o exemplo da sua documentação
            res.status(201).json({ 
                id_produto: resultado.insertId, 
                ...req.body 
            });
        } catch (erro) {
            res.status(500).json({ mensagem: 'Erro ao cadastrar produto' });
        }
    }

    // PUT /produtos/:id
    async atualizar(req, res) {
        const { id } = req.params;
        try {
            await produtoRepository.atualizar(id, req.body);
            res.status(200).json({ mensagem: 'Produto atualizado com sucesso' });
        } catch (erro) {
            res.status(500).json({ mensagem: 'Erro ao atualizar produto' });
        }
    }

    // DELETE /produtos/:id
    async excluir(req, res) {
        const { id } = req.params;
        try {
            await produtoRepository.excluir(id);
            res.status(200).json({ mensagem: 'Produto removido com sucesso' });
        } catch (erro) {
            res.status(500).json({ mensagem: 'Erro ao excluir produto' });
        }
    }
}

module.exports = new ProdutoController();
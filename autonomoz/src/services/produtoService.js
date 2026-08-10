class ProdutoService {
    // Retorna a lista de todos os produtos
    async listarTodos() {
        return await produtoRepository.listarTodos();
    }

    // Busca um produto e valida se ele existe
    async buscarPorId(id) {
        const [produto] = await produtoRepository.buscarPorId(id);
        if (!produto || produto.length === 0) {
            throw new Error('Produto não encontrado.');
        }
        return produto;
    }

    // Cadastra um novo produto seguindo os campos da modelagem
    async cadastrar(dadosProduto) {
        // Exemplo de regra de negócio: validar se o estoque mínimo não é negativo
        if (dadosProduto.estoque_minimo < 0) {
            throw new Error('O estoque mínimo não pode ser negativo.');
        }
        
        return await produtoRepository.salvar(dadosProduto);
    }

    // Atualiza os dados de um produto existente
    async atualizar(id, dadosProduto) {
        // Verifica se o produto existe antes de tentar atualizar
        await this.buscarPorId(id);
        return await produtoRepository.atualizar(id, dadosProduto);
    }

    // Remove um produto do sistema
    async excluir(id) {
        // Verifica se o produto existe antes de excluir
        await this.buscarPorId(id);
        return await produtoRepository.excluir(id);
    }
}

module.exports = new ProdutoService();
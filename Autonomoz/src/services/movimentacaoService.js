const movimentacaoRepository = require('../repositories/movimentacaoRepository');

class MovimentacaoService {
    async listarTodos() {
        return await movimentacaoRepository.listarTodos();
    }

    async buscarPorId(id) {
        const movimentacao = await movimentacaoRepository.buscarPorId(id);
        if (!movimentacao) {
            throw new Error('Movimentação não encontrada.');
        }
        return movimentacao;
    }

    async cadastrar(dados) {
        if (!dados.fk_lote) {
            throw new Error('O lote (fk_lote) é obrigatório.');
        }
        if (!dados.fk_usuario) {
            throw new Error('O usuário (fk_usuario) é obrigatório.');
        }
        if (!dados.tipo_movimento || !['ENTRADA', 'SAIDA'].includes(dados.tipo_movimento)) {
            throw new Error('Tipo de movimento inválido. Use "ENTRADA" ou "SAIDA".');
        }
        if (!dados.quantidade || dados.quantidade <= 0) {
            throw new Error('A quantidade deve ser maior que zero.');
        }
        if (dados.tipo_movimento === 'SAIDA' && !dados.motivo_saida) {
            throw new Error('O motivo da saída é obrigatório para movimentações de saída.');
        }

        return await movimentacaoRepository.salvar(dados);
    }

    async atualizar(id, dados) {
        await this.buscarPorId(id);
        return await movimentacaoRepository.atualizar(id, dados);
    }

    async excluir(id) {
        await this.buscarPorId(id);
        return await movimentacaoRepository.excluir(id);
    }

    // Aliases para compatibilidade
    async getAll() { return this.listarTodos(); }
    async getById(id) { return this.buscarPorId(id); }
    async create(dados) { return this.cadastrar(dados); }
    async update(id, dados) { return this.atualizar(id, dados); }
    async delete(id) { return this.excluir(id); }
}

module.exports = new MovimentacaoService();

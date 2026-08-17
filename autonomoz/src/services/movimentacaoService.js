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
        if (!dados.quantidade || dados.quantidade <= 0) {
            throw new Error('A quantidade deve ser maior que zero.');
        }
        if (!dados.tipo_movimento) {
            throw new Error('O tipo de movimento (ENTRADA/SAIDA) é obrigatório.');
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
}

module.exports = new MovimentacaoService();

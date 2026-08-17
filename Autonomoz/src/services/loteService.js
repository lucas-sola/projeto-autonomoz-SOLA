const loteRepository = require('../repositories/loteRepository');

class LoteService {
    async listarTodos() {
        return await loteRepository.listarTodos();
    }

    async buscarPorId(id) {
        const lote = await loteRepository.buscarPorId(id);
        if (!lote) {
            throw new Error('Lote não encontrado.');
        }
        return lote;
    }

    async cadastrar(dados) {
        if (!dados.codigo_lote) {
            throw new Error('O código do lote é obrigatório.');
        }
        if (!dados.fk_produto) {
            throw new Error('O produto é obrigatório.');
        }
        if (!dados.localizacao_fisica) {
            throw new Error('A localização física é obrigatória.');
        }
        return await loteRepository.salvar(dados);
    }

    async atualizar(id, dados) {
        await this.buscarPorId(id);
        return await loteRepository.atualizar(id, dados);
    }

    async excluir(id) {
        await this.buscarPorId(id);
        return await loteRepository.excluir(id);
    }
}

module.exports = new LoteService();

const vendasRepository = require('../repositories/vendasRepository');

class VendasService {
    async listarTodos() {
        return await vendasRepository.listarTodos();
    }

    async buscarPorId(id) {
        const venda = await vendasRepository.buscarPorId(id);
        if (!venda) {
            throw new Error('Venda não encontrada.');
        }
        return venda;
    }

    async cadastrar(dados) {
        if (!dados.fk_ordem_producao) {
            throw new Error('A Ordem de Produção é obrigatória.');
        }
        if (!dados.fk_usuario_gerente) {
            throw new Error('O gerente responsável é obrigatório.');
        }
        if (!dados.valor_venda || dados.valor_venda <= 0) {
            throw new Error('O valor da venda deve ser maior que zero.');
        }

        return await vendasRepository.salvar(dados);
    }

    async atualizar(id, dados) {
        await this.buscarPorId(id);
        return await vendasRepository.atualizar(id, dados);
    }

    async excluir(id) {
        await this.buscarPorId(id);
        return await vendasRepository.excluir(id);
    }
}

module.exports = new VendasService();

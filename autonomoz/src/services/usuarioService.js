const usuarioRepository = require('../repositories/usuarioRepository');

class UsuarioService {
    async listarTodos() {
        return await usuarioRepository.listarTodos();
    }

    async buscarPorId(id) {
        const usuario = await usuarioRepository.buscarPorId(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado.');
        }
        const { senha_hash, ...dadosPublicos } = usuario;
        return dadosPublicos;
    }

    async autenticar(matricula, senha) {
        const usuario = await usuarioRepository.buscarPorMatricula(matricula);

        if (!usuario) {
            throw new Error('Matrícula não encontrada.');
        }

        if (usuario.senha_hash !== senha) {
            throw new Error('Senha incorreta.');
        }

        const { senha_hash, ...dadosPublicos } = usuario;
        return dadosPublicos;
    }

    async cadastrar(adminId, dados) {
        if (!adminId) {
            throw new Error('ID do administrador não fornecido no header (user-id).');
        }

        const admin = await usuarioRepository.buscarPorId(adminId);

        if (!admin || admin.tipo_acesso !== 'GERENTE') {
            throw new Error('Acesso negado: Apenas gerentes podem cadastrar funcionários.');
        }

        if (!dados.matricula || !dados.nome_completo || !dados.senha_hash) {
            throw new Error('Dados obrigatórios (matrícula, nome, senha) ausentes.');
        }

        dados.fk_usuario_criador = adminId;
        const resultado = await usuarioRepository.salvar(dados);
        
        return { id_usuario: resultado.insertId, ...dados };
    }

    async atualizar(id, dados) {
        await this.buscarPorId(id);
        return await usuarioRepository.atualizar(id, dados);
    }

    async excluir(id) {
        await this.buscarPorId(id);
        return await usuarioRepository.excluir(id);
    }

    async buscarCargos() {
        return await usuarioRepository.buscarCargos();
    }
}

module.exports = new UsuarioService();
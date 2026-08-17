const usuarioRepository = require('../repositories/usuarioRepository');

class AuthService {
    async login(matricula, senha) {
        if (!matricula || !senha) {
            throw new Error('Matrícula e senha são obrigatórias.');
        }

        const usuario = await usuarioRepository.buscarPorMatricula(matricula);
        if (!usuario) {
            throw new Error('Matrícula ou senha incorretas.');
        }

        if (usuario.senha_hash !== senha) {
            throw new Error('Matrícula ou senha incorretas.');
        }

        if (!usuario.ativo) {
            throw new Error('Usuário inativo no sistema.');
        }

        const { senha_hash, ...dadosPublicos } = usuario;
        return {
            mensagem: 'Login realizado com sucesso.',
            usuario: dadosPublicos
        };
    }
}

module.exports = new AuthService();

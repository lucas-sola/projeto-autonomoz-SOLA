const usuarioRepository = require('../repositories/usuarioRepository');

class UsuarioService {
    /**
     * Auxiliar para desembrulhar retornos do MySQL (Arrays aninhados)
     */
    _extractSingleUser(result) {
        if (!result) return null;
        let data = result;
        // Se for um array de arrays ex: [ [usuario], fields ], desce um nível
        while (Array.isArray(data) && data.length > 0) {
            data = data[0];
        }
        // Se encontrou um objeto válido, retorna ele; caso contrário, null
        return (data && typeof data === 'object' && !Array.isArray(data)) ? data : null;
    }

    /**
     * RES 03: Autenticação por Matrícula e Senha.
     */
    async authenticate(matricula, senha) {
        const rows = await usuarioRepository.findByMatricula(matricula);
        const usuario = this._extractSingleUser(rows);

        if (!usuario) {
            throw new Error('Matrícula não encontrada.');
        }

        if (usuario.senha_hash !== senha) {
            throw new Error('Senha incorreta.');
        }

        const { senha_hash, ...dadosPublicos } = usuario;
        return dadosPublicos;
    }

    /**
     * RN-01 e RN-05: Apenas GERENTE pode cadastrar novos usuários.
     */
    async registerNewUser(adminId, userData) {
        if (!adminId) {
            throw new Error('ID do administrador não fornecido no header (user-id).');
        }

        const adminRows = await usuarioRepository.findById(adminId);
        const admin = this._extractSingleUser(adminRows);

        // Debug para inspecionar no console do terminal
        console.log('--- DEBUG CADASTRO ---');
        console.log('adminId recebido:', adminId);
        console.log('Objeto admin extraído:', admin);
        console.log('tipo_acesso:', admin ? admin.tipo_acesso : 'NULO');

        if (!admin || admin.tipo_acesso !== 'GERENTE') {
            throw new Error('Acesso negado: Apenas gerentes podem cadastrar funcionários.');
        }

        if (!userData.matricula || !userData.nome_completo || !userData.senha_hash) {
            throw new Error('Dados obrigatórios (matrícula, nome, senha) ausentes.');
        }

        userData.fk_usuario_criador = adminId;
        const newId = await usuarioRepository.save(userData);
        
        return { id_usuario: newId, ...userData };
    }
}

module.exports = new UsuarioService();
const usuarioRepository = require('../repositories/usuarioRepository');
const usuarioService = require('../services/usuarioService');

class UsuarioController {
    async getAll(req, res) {
        try {
            const usuarios = await usuarioRepository.findAll();
            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(500).json({ error: "Erro interno ao buscar usuários." });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const rows = await usuarioRepository.findById(id);
            
            // CORRIGIDO: Extrai a primeira posição do array caso retorne lista
            const usuario = Array.isArray(rows) ? (Array.isArray(rows[0]) ? rows[0][0] : rows[0]) : rows;

            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }
            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar usuário." });
        }
    }

    async create(req, res) {
        try {
            // Garante a leitura independente de maiúsculas/minúsculas no header
            const adminId = req.headers['user-id'] || req.headers['userid']; 
            
            const novoUsuario = await usuarioService.registerNewUser(adminId, req.body);
            
            const { senha_hash, ...dadosPublicos } = novoUsuario;
            
            return res.status(201).json(dadosPublicos);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { matricula, senha } = req.body;
            const usuario = await usuarioService.authenticate(matricula, senha);
            return res.status(200).json({ message: "Login realizado com sucesso", usuario });
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const sucesso = await usuarioRepository.update(id, req.body);
            if (!sucesso) {
                return res.status(404).json({ message: "Usuário não encontrado ou sem alterações." });
            }
            return res.status(200).json({ message: "Dados atualizados com sucesso." });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar dados." });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const sucesso = await usuarioRepository.delete(id);
            if (!sucesso) {
                return res.status(404).json({ message: "Usuário não encontrado para remoção." });
            }
            return res.status(200).json({ message: "Usuário removido do sistema." });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao remover usuário." });
        }
    }
}

module.exports = new UsuarioController();
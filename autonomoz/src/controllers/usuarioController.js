const usuarioService = require('../services/usuarioService');

class UsuarioController {
    async listar(req, res) {
        try {
            const usuarios = await usuarioService.listarTodos();
            res.status(200).json(usuarios);
        } catch (erro) {
            res.status(500).json({ mensagem: 'Erro ao buscar usuários.', erro: erro.message });
        }
    }

    async buscarPorId(req, res) {
        try {
            const usuario = await usuarioService.buscarPorId(req.params.id);
            res.status(200).json(usuario);
        } catch (erro) {
            res.status(404).json({ mensagem: erro.message });
        }
    }

    async cadastrar(req, res) {
        try {
            const adminId = req.headers['user-id'] || req.headers['userid']; 
            const novoUsuario = await usuarioService.cadastrar(adminId, req.body);
            
            const { senha_hash, ...dadosPublicos } = novoUsuario;
            res.status(201).json(dadosPublicos);
        } catch (erro) {
            res.status(400).json({ mensagem: erro.message });
        }
    }

    async login(req, res) {
        try {
            const { matricula, senha } = req.body;
            const usuario = await usuarioService.autenticar(matricula, senha);
            res.status(200).json({ mensagem: 'Login realizado com sucesso.', usuario });
        } catch (erro) {
            res.status(401).json({ mensagem: erro.message });
        }
    }

    async atualizar(req, res) {
        try {
            await usuarioService.atualizar(req.params.id, req.body);
            res.status(200).json({ mensagem: 'Usuário atualizado.' });
        } catch (erro) {
            res.status(400).json({ mensagem: erro.message });
        }
    }

    async excluir(req, res) {
        try {
            await usuarioService.excluir(req.params.id);
            res.status(200).json({ mensagem: 'Usuário removido.' });
        } catch (erro) {
            res.status(400).json({ mensagem: erro.message });
        }
    }

    async buscarCargos(req, res) {
        try {
            const cargos = await usuarioService.buscarCargos();
            res.status(200).json(cargos);
        } catch (erro) {
            res.status(500).json({ mensagem: 'Erro ao listar cargos.', erro: erro.message });
        }
    }
}

module.exports = new UsuarioController();
const db = require('../config/database');

class UsuarioRepository {
    async findAll() {
        const [rows] = await db.query('SELECT id_usuario, matricula, nome_completo, tipo_acesso, cargo_descritivo FROM Usuarios');
        return rows;
    }

    async findById(id) {
        const [rows] = await db.query('SELECT * FROM Usuarios WHERE id_usuario = ?', [id]);
        return rows; 
    }

    async findByMatricula(matricula) {
        const [rows] = await db.query('SELECT * FROM Usuarios WHERE matricula = ?', [matricula]);
        return rows;
    }

    async save(u) {
        const [res] = await db.query(
            'INSERT INTO Usuarios (matricula, nome_completo, cpf, data_nascimento, senha_hash, tipo_acesso, cargo_descritivo, fk_usuario_criador) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [u.matricula, u.nome_completo, u.cpf, u.data_nascimento, u.senha_hash, u.tipo_acesso, u.cargo_descritivo, u.fk_usuario_criador]
        );
        return res.insertId;
    }
}

module.exports = new UsuarioRepository();
const db = require('../config/database');

class UsuarioRepository {
    async findAll() {
        const [rows] = await db.query('SELECT id_usuario, matricula, nome_completo, tipo_acesso, cargo_descritivo FROM Usuarios');
        return rows;
    }

    async findById(id) {
        const [rows] = await db.query('SELECT * FROM Usuarios WHERE id_usuario = ?', [id]);
        return rows[0] || null; // Retorna o objeto do usuário ou null se não encontrar
    }

    async findByMatricula(matricula) {
        const [rows] = await db.query('SELECT * FROM Usuarios WHERE matricula = ?', [matricula]);
        return rows[0] || null; // Retorna o objeto do usuário ou null se não encontrar
    }

    async save(u) {
        const [res] = await db.query(
            'INSERT INTO Usuarios (matricula, nome_completo, cpf, data_nascimento, senha_hash, tipo_acesso, cargo_descritivo, fk_usuario_criador) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [u.matricula, u.nome_completo, u.cpf, u.data_nascimento, u.senha_hash, u.tipo_acesso, u.cargo_descritivo, u.fk_usuario_criador]
        );
        return res.insertId;
    }

    // Método de atualização dinâmico (adicionado para corrigir o erro 500)
    async update(id, data) {
        const fields = [];
        const values = [];

        // Monta dinamicamente as colunas que vieram no body do req
        Object.keys(data).forEach(key => {
            fields.push(`${key} = ?`);
            values.push(data[key]);
        });

        if (fields.length === 0) return false;

        values.push(id); // Adiciona o ID no final para a cláusula WHERE

        const sql = `UPDATE Usuarios SET ${fields.join(', ')} WHERE id_usuario = ?`;
        const [res] = await db.query(sql, values);
        
        return res.affectedRows > 0;
    }

    async delete(id) {
        const [res] = await db.query('DELETE FROM Usuarios WHERE id_usuario = ?', [id]);
        return res.affectedRows > 0;
    }
}

module.exports = new UsuarioRepository();
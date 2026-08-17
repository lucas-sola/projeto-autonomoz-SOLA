const db = require('../config/database');

class CargoRepository {
    async findAll() {
        const [rows] = await db.query('SELECT * FROM Cargo ORDER BY nome_cargo ASC');
        return rows;
    }

    async findById(id) {
        const [rows] = await db.query('SELECT * FROM Cargo WHERE id_cargo = ?', [id]);
        return rows[0] || null;
    }

    async save(cargo) {
        const [res] = await db.query(
            'INSERT INTO Cargo (nome_cargo, descricao) VALUES (?, ?)',
            [cargo.nome_cargo, cargo.descricao]
        );
        return res.insertId;
    }

    async update(id, cargo) {
        const [res] = await db.query(
            'UPDATE Cargo SET nome_cargo = ?, descricao = ? WHERE id_cargo = ?',
            [cargo.nome_cargo, cargo.descricao, id]
        );
        return res.affectedRows > 0;
    }

    async delete(id) {
        const [res] = await db.query('DELETE FROM Cargo WHERE id_cargo = ?', [id]);
        return res.affectedRows > 0;
    }
}

module.exports = new CargoRepository();
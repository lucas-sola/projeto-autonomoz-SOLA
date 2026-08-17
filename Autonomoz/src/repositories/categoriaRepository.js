const db = require ('../config/database');

class categoriaRepository {
    async listarTodos(){
        const sql = 'SELECT * FROM Categoria'
        const [linhas] = await db.query(sql)

        return linhas;
    }

    async buscarPorId(id){
        const sql = 'SELECT * FROM Categoria WHERE id_categoria = ?';

        const [linhas] = await db.query(sql, [id]);
        return linhas;
    }

    async salvar(categoria) {
        const {id_categoria, nome_categoria, descricao} = categoria;

        const sql = 'INSERT INTO Categoria (id_categoria, nome_categoria, descricao) VALUES (?, ?, ?)';

        const [resultado] = await db.query(sql, [id_categoria, nome_categoria, descricao || 0 ]);
        
        return resultado;
    }

    async atualizar(id, categoria){
        const { nome_categoria, descricao} = categoria;

        const sql = 'UPDATE Categoria SET nome_categoria = ?, descricao = ? WHERE id_categoria = ?';

        const [resultado] = await db.query(sql, [nome_categoria, descricao, id]);

        return resultado;
    }

    async excluir(id){
        const sql = 'DELETE FROM Categoria WHERE id_categoria = ?';
        const [resultado] = await db.query(sql, [id]);
        return resultado;
    }
}

module.exports = new categoriaRepository();
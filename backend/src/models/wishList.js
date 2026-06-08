import pool from '../database/db.js'

export const wishListModel = {
    async listarTodas() {
        const { rows } = await pool.query(
            `SELECT w.*, u.name AS user_name,
        (SELECT COALESCE(SUM(price),0) FROM items WHERE wish_list_id = w.id AND status = 'desejado') AS total_estimado
       FROM wish_lists w
       LEFT JOIN users u ON w.user_id = u.id
       ORDER BY w.created_at DESC`
        )
        return rows
    },

    async buscarPorId(id) {
        const { rows } = await pool.query(
            `SELECT w.*, u.name AS user_name,
        (SELECT COALESCE(SUM(price),0) FROM items WHERE wish_list_id = w.id AND status = 'desejado') AS total_estimado
       FROM wish_lists w
       LEFT JOIN users u ON w.user_id = u.id
       WHERE w.id = $1`,
            [id]
        )
        return rows[0] || null
    },

    async listarPorUsuario(user_id) {
        const { rows } = await pool.query(
            'SELECT * FROM wish_lists WHERE user_id = $1 ORDER BY created_at DESC',
            [user_id]
        )
        return rows
    },

    async inserir({ user_id, name }) {
        const { rows } = await pool.query(
            'INSERT INTO wish_lists (user_id, name) VALUES ($1, $2) RETURNING *',
            [user_id || null, name]
        )
        return rows[0]
    },

    async atualizar(id, { name }) {
        const { rows } = await pool.query(
            'UPDATE wish_lists SET name = COALESCE($1, name) WHERE id = $2 RETURNING *',
            [name, id]
        )
        return rows[0] || null
    },

    async remover(id) {
        const { rowCount } = await pool.query('DELETE FROM wish_lists WHERE id = $1', [id])
        return rowCount > 0
    },
}
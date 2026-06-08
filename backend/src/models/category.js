import pool from '../database/db.js'

export const categoryModel = {
    async listarTodas() {
        const { rows } = await pool.query('SELECT * FROM categories ORDER BY name')
        return rows
    },

    async buscarPorId(id) {
        const { rows } = await pool.query('SELECT * FROM categories WHERE id = $1', [id])
        return rows[0] || null
    },

    async existeNome(name) {
        const { rows } = await pool.query(
            'SELECT id FROM categories WHERE LOWER(name) = LOWER($1)', [name]
        )
        return rows.length > 0
    },

    async inserir({ name, icon }) {
        const { rows } = await pool.query(
            'INSERT INTO categories (name, icon) VALUES ($1, $2) RETURNING *',
            [name, icon || null]
        )
        return rows[0]
    },

    async atualizar(id, { name, icon }) {
        const { rows } = await pool.query(
            `UPDATE categories SET
        name = COALESCE($1, name),
        icon = COALESCE($2, icon)
       WHERE id = $3 RETURNING *`,
            [name, icon, id]
        )
        return rows[0] || null
    },

    async remover(id) {
        const { rowCount } = await pool.query('DELETE FROM categories WHERE id = $1', [id])
        return rowCount > 0
    },
}
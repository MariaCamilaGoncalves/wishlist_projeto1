import pool from '../database/db.js'

export const userModel = {
    async listarTodos() {
        const { rows } = await pool.query('SELECT * FROM users ORDER BY created_at DESC')
        return rows
    },

    async buscarPorId(id) {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
        return rows[0] || null
    },

    async existeEmail(email) {
        const { rows } = await pool.query(
            'SELECT id FROM users WHERE LOWER(email) = LOWER($1)', [email]
        )
        return rows.length > 0
    },

    async inserir({ name, email }) {
        const { rows } = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        )
        return rows[0]
    },

    async atualizar(id, { name, email }) {
        const { rows } = await pool.query(
            `UPDATE users SET
        name       = COALESCE($1, name),
        email      = COALESCE($2, email),
        updated_at = NOW()
       WHERE id = $3 RETURNING *`,
            [name, email, id]
        )
        return rows[0] || null
    },

    async remover(id) {
        const { rowCount } = await pool.query('DELETE FROM users WHERE id = $1', [id])
        return rowCount > 0
    },
}
import pool from '../database/db.js'

export const priceHistoryModel = {
    async listarPorItem(item_id) {
        const { rows } = await pool.query(
            'SELECT * FROM price_history WHERE item_id = $1 ORDER BY recorded_at DESC',
            [item_id]
        )
        return rows
    },

    async buscarPorId(id) {
        const { rows } = await pool.query('SELECT * FROM price_history WHERE id = $1', [id])
        return rows[0] || null
    },

    async inserir({ item_id, price }) {
        const { rows } = await pool.query(
            'INSERT INTO price_history (item_id, price) VALUES ($1, $2) RETURNING *',
            [item_id, price]
        )
        return rows[0]
    },

    async remover(id) {
        const { rowCount } = await pool.query('DELETE FROM price_history WHERE id = $1', [id])
        return rowCount > 0
    },
}
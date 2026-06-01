import pool from '../database/db.js'

export const itemModel = {
    async listarTodos({ status, priority, category_id } = {}) {
        let query = `
      SELECT i.*, c.name AS category_name, c.icon AS category_icon
      FROM items i
      LEFT JOIN categories c ON i.category_id = c.id
      WHERE 1=1
    `
        const params = []

        if (status) { params.push(status); query += ` AND i.status = $${params.length}` }
        if (priority) { params.push(priority); query += ` AND i.priority = $${params.length}` }
        if (category_id) { params.push(category_id); query += ` AND i.category_id = $${params.length}` }

        query += ' ORDER BY i.created_at DESC'
        const { rows } = await pool.query(query, params)
        return rows
    },

    async buscarPorId(id) {
        const { rows } = await pool.query(
            `SELECT i.*, c.name AS category_name, c.icon AS category_icon
       FROM items i
       LEFT JOIN categories c ON i.category_id = c.id
       WHERE i.id = $1`,
            [id]
        )
        return rows[0] || null
    },

    async inserir({ category_id, name, price, priority, status, link }) {
        const { rows } = await pool.query(
            `INSERT INTO items (category_id, name, price, priority, status, link)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [category_id || null, name, price || 0, priority || 'media', status || 'desejado', link || null]
        )
        return rows[0]
    },

    async atualizar(id, { category_id, name, price, priority, status, link }) {
        const { rows } = await pool.query(
            `UPDATE items SET
        category_id = COALESCE($1, category_id),
        name        = COALESCE($2, name),
        price       = COALESCE($3, price),
        priority    = COALESCE($4, priority),
        status      = COALESCE($5, status),
        link        = COALESCE($6, link)
       WHERE id = $7 RETURNING *`,
            [category_id, name, price, priority, status, link, id]
        )
        return rows[0] || null
    },

    async remover(id) {
        const { rowCount } = await pool.query('DELETE FROM items WHERE id = $1', [id])
        return rowCount > 0
    },

    async totalEstimado() {
        const { rows } = await pool.query(
            `SELECT COALESCE(SUM(price), 0) AS total FROM items WHERE status = 'desejado'`
        )
        return Number(rows[0].total)
    },
}
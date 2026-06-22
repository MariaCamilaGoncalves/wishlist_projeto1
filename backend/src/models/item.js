import { db } from '../database/db.js'

export const itemModel = {
    listarTodos({ status, priority, category_id, wish_list_id } = {}) {
        let query = `
      SELECT i.*, c.name AS category_name, c.icon AS category_icon
      FROM items i
      LEFT JOIN categories c ON i.category_id = c.id
      WHERE 1=1
    `
        const params = []
        if (status) { query += ' AND i.status = ?'; params.push(status) }
        if (priority) { query += ' AND i.priority = ?'; params.push(priority) }
        if (category_id) { query += ' AND i.category_id = ?'; params.push(Number(category_id)) }
        if (wish_list_id) { query += ' AND i.wish_list_id = ?'; params.push(Number(wish_list_id)) }
        query += ' ORDER BY i.created_at DESC'
        return db.prepare(query).all(...params)
    },

    buscarPorId(id) {
        return db.prepare(`
      SELECT i.*, c.name AS category_name, c.icon AS category_icon
      FROM items i
      LEFT JOIN categories c ON i.category_id = c.id
      WHERE i.id = ?
    `).get(id) || null
    },

    inserir({ category_id, wish_list_id, name, price, priority, status, link }) {
        const r = db.prepare(`
      INSERT INTO items (category_id, wish_list_id, name, price, priority, status, link)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
            category_id ?? null,
            wish_list_id ?? null,
            name,
            price || 0,
            priority || 'media',
            status || 'desejado',
            link ?? null
        )
        return this.buscarPorId(r.lastInsertRowid)
    },

    atualizar(id, { category_id, wish_list_id, name, price, priority, status, link }) {
        const atual = this.buscarPorId(id)
        if (!atual) return null
        db.prepare(`
      UPDATE items SET
        category_id  = ?,
        wish_list_id = ?,
        name         = ?,
        price        = ?,
        priority     = ?,
        status       = ?,
        link         = ?
      WHERE id = ?
    `).run(
            category_id ?? atual.category_id,
            wish_list_id ?? atual.wish_list_id,
            name ?? atual.name,
            price ?? atual.price,
            priority ?? atual.priority,
            status ?? atual.status,
            link ?? atual.link,
            id
        )
        return this.buscarPorId(id)
    },

    remover(id) {
        return db.prepare('DELETE FROM items WHERE id = ?').run(id).changes > 0
    },

    totalEstimado(wish_list_id) {
        let query = `SELECT COALESCE(SUM(price), 0) AS total FROM items WHERE status = 'desejado'`
        const params = []
        if (wish_list_id) { query += ' AND wish_list_id = ?'; params.push(Number(wish_list_id)) }
        return db.prepare(query).get(...params).total
    },
}
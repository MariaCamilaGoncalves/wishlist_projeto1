import { db } from '../database/db.js'

export const wishListModel = {
    listarTodas() {
        return db.prepare(`
      SELECT w.*, u.name AS user_name
      FROM wish_lists w
      LEFT JOIN users u ON w.user_id = u.id
      ORDER BY w.created_at DESC
    `).all()
    },

    buscarPorId(id) {
        return db.prepare(`
      SELECT w.*, u.name AS user_name
      FROM wish_lists w
      LEFT JOIN users u ON w.user_id = u.id
      WHERE w.id = ?
    `).get(id) || null
    },

    listarPorUsuario(user_id) {
        return db.prepare('SELECT * FROM wish_lists WHERE user_id = ? ORDER BY created_at DESC')
            .all(Number(user_id))
    },

    inserir({ user_id, name }) {
        const r = db.prepare('INSERT INTO wish_lists (user_id, name) VALUES (?, ?)').run(user_id ?? null, name)
        return this.buscarPorId(r.lastInsertRowid)
    },

    atualizar(id, { name }) {
        const atual = this.buscarPorId(id)
        if (!atual) return null
        db.prepare('UPDATE wish_lists SET name = ? WHERE id = ?').run(name ?? atual.name, id)
        return this.buscarPorId(id)
    },

    remover(id) {
        return db.prepare('DELETE FROM wish_lists WHERE id = ?').run(id).changes > 0
    },
}
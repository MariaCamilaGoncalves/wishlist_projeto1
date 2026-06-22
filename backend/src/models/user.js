import { db } from '../database/db.js'

export const userModel = {
    listarTodos() {
        return db.prepare('SELECT * FROM users ORDER BY created_at DESC').all()
    },

    buscarPorId(id) {
        return db.prepare('SELECT * FROM users WHERE id = ?').get(id) || null
    },

    existeEmail(email) {
        return db.prepare('SELECT 1 FROM users WHERE LOWER(email) = LOWER(?)').get(email) !== undefined
    },

    inserir({ name, email }) {
        const r = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)').run(name, email)
        return this.buscarPorId(r.lastInsertRowid)
    },

    atualizar(id, { name, email }) {
        const atual = this.buscarPorId(id)
        if (!atual) return null
        db.prepare(`
      UPDATE users SET name = ?, email = ?, updated_at = datetime('now') WHERE id = ?
    `).run(name ?? atual.name, email ?? atual.email, id)
        return this.buscarPorId(id)
    },

    remover(id) {
        return db.prepare('DELETE FROM users WHERE id = ?').run(id).changes > 0
    },
}
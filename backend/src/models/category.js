import { db } from '../database/db.js'

export const categoryModel = {
    listarTodas() {
        return db.prepare('SELECT * FROM categories ORDER BY name').all()
    },

    buscarPorId(id) {
        return db.prepare('SELECT * FROM categories WHERE id = ?').get(id) || null
    },

    existeNome(name) {
        return db.prepare('SELECT 1 FROM categories WHERE LOWER(name) = LOWER(?)').get(name) !== undefined
    },

    inserir({ name, icon }) {
        const r = db.prepare('INSERT INTO categories (name, icon) VALUES (?, ?)').run(name, icon ?? null)
        return this.buscarPorId(r.lastInsertRowid)
    },

    atualizar(id, { name, icon }) {
        const atual = this.buscarPorId(id)
        if (!atual) return null
        db.prepare('UPDATE categories SET name = ?, icon = ? WHERE id = ?')
            .run(name ?? atual.name, icon ?? atual.icon, id)
        return this.buscarPorId(id)
    },

    remover(id) {
        return db.prepare('DELETE FROM categories WHERE id = ?').run(id).changes > 0
    },
}
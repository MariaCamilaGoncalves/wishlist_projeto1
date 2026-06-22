import { db } from '../database/db.js'

export const priceHistoryModel = {
    listarPorItem(item_id) {
        return db.prepare('SELECT * FROM price_history WHERE item_id = ? ORDER BY recorded_at DESC')
            .all(Number(item_id))
    },

    buscarPorId(id) {
        return db.prepare('SELECT * FROM price_history WHERE id = ?').get(id) || null
    },

    inserir({ item_id, price }) {
        const r = db.prepare('INSERT INTO price_history (item_id, price) VALUES (?, ?)').run(Number(item_id), Number(price))
        return this.buscarPorId(r.lastInsertRowid)
    },

    remover(id) {
        return db.prepare('DELETE FROM price_history WHERE id = ?').run(id).changes > 0
    },
}
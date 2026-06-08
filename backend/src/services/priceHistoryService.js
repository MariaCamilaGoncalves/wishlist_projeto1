import { priceHistoryModel } from '../models/priceHistory.js'
import { itemModel } from '../models/item.js'

export const priceHistoryService = {
    async listarPorItem(item_id) {
        return priceHistoryModel.listarPorItem(item_id)
    },

    async buscarPorId(id) {
        const registro = await priceHistoryModel.buscarPorId(id)
        if (!registro) {
            const err = new Error('Registro não encontrado')
            err.status = 404
            throw err
        }
        return registro
    },

    async registrar({ item_id, price }) {
        if (!item_id || price === undefined) {
            const err = new Error('Campos "item_id" e "price" são obrigatórios')
            err.status = 400
            throw err
        }
        const item = await itemModel.buscarPorId(item_id)
        if (!item) {
            const err = new Error('Item informado não existe')
            err.status = 422
            throw err
        }
        return priceHistoryModel.inserir({ item_id, price })
    },

    async remover(id) {
        const removido = await priceHistoryModel.remover(id)
        if (!removido) {
            const err = new Error('Registro não encontrado')
            err.status = 404
            throw err
        }
    },
}
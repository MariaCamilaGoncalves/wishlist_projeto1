import { api } from '../api.js'

export const priceHistoryService = {
    listarPorItem: (item_id) => api.getPriceHistory(item_id),

    async registrar({ item_id, price }) {
        if (!item_id) throw new Error('Item é obrigatório')
        if (isNaN(Number(price))) throw new Error('Preço inválido')
        return api.registrarPreco({ item_id: Number(item_id), price: Number(price) })
    },
}
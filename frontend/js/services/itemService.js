import { api } from '../api.js'

export const itemService = {
    listar: (wish_list_id) => api.getItems(wish_list_id ? `?wish_list_id=${wish_list_id}` : ''),
    totalEstimado: (wish_list_id) => api.getTotalEstimado(wish_list_id),
    remover: (id) => api.removerItem(id),
    atualizar: (id, d) => api.atualizarItem(id, d),

    async criar({ name, price, category_id, priority, status, link, wish_list_id }) {
        if (!name?.trim()) throw new Error('Nome é obrigatório')
        return api.criarItem({
            name: name.trim(), price: Number(price) || 0,
            category_id: Number(category_id) || null,
            wish_list_id: Number(wish_list_id) || null,
            priority: priority || 'media',
            status: status || 'desejado',
            link: link || null,
        })
    },
}
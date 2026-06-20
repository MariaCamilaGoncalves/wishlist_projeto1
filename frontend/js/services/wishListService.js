import { api } from '../api.js'

export const wishListService = {
    listar: (user_id) => api.getWishLists(user_id),
    remover: (id) => api.removerWishList(id),

    async criar({ name, user_id }) {
        if (!name?.trim()) throw new Error('Nome da lista é obrigatório')
        if (!user_id) throw new Error('Usuário não selecionado')
        return api.criarWishList({ name: name.trim(), user_id })
    },

    async atualizar(id, { name }) {
        if (!name?.trim()) throw new Error('Nome é obrigatório')
        return api.atualizarWishList(id, { name: name.trim() })
    },
}
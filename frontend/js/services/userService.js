import { api } from '../api.js'

export const userService = {
    listar: () => api.getUsers(),
    remover: (id) => api.removerUser(id),
    atualizar: (id, d) => api.atualizarUser(id, d),

    async criar({ name, email }) {
        if (!name?.trim()) throw new Error('Nome é obrigatório')
        if (!email?.trim()) throw new Error('E-mail é obrigatório')

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email.trim())) throw new Error('E-mail inválido')

        return api.criarUser({ name: name.trim(), email: email.trim() })
    },
}
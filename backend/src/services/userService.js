import { userModel } from '../models/user.js'

export const userService = {
    async listarTodos() {
        return userModel.listarTodos()
    },

    async buscarPorId(id) {
        const user = await userModel.buscarPorId(id)
        if (!user) {
            const err = new Error('Usuário não encontrado')
            err.status = 404
            throw err
        }
        return user
    },

    async criar({ name, email }) {
        if (!name || !email) {
            const err = new Error('Campos "name" e "email" são obrigatórios')
            err.status = 400
            throw err
        }
        const existe = await userModel.existeEmail(email)
        if (existe) {
            const err = new Error('Já existe um usuário com este e-mail')
            err.status = 409
            throw err
        }
        return userModel.inserir({ name, email })
    },

    async atualizar(id, dados) {
        const atualizado = await userModel.atualizar(id, dados)
        if (!atualizado) {
            const err = new Error('Usuário não encontrado')
            err.status = 404
            throw err
        }
        return atualizado
    },

    async remover(id) {
        const removido = await userModel.remover(id)
        if (!removido) {
            const err = new Error('Usuário não encontrado')
            err.status = 404
            throw err
        }
    },
}
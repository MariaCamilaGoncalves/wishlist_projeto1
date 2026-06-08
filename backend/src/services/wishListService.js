import { wishListModel } from '../models/wishList.js'
import { userModel } from '../models/user.js'

export const wishListService = {
    async listarTodas() {
        return wishListModel.listarTodas()
    },

    async buscarPorId(id) {
        const wishList = await wishListModel.buscarPorId(id)
        if (!wishList) {
            const err = new Error('Lista não encontrada')
            err.status = 404
            throw err
        }
        return wishList
    },

    async listarPorUsuario(user_id) {
        return wishListModel.listarPorUsuario(user_id)
    },

    async criar({ user_id, name }) {
        if (!name) {
            const err = new Error('Campo "name" é obrigatório')
            err.status = 400
            throw err
        }
        if (user_id) {
            const user = await userModel.buscarPorId(user_id)
            if (!user) {
                const err = new Error('Usuário informado não existe')
                err.status = 422
                throw err
            }
        }
        return wishListModel.inserir({ user_id, name })
    },

    async atualizar(id, dados) {
        const atualizada = await wishListModel.atualizar(id, dados)
        if (!atualizada) {
            const err = new Error('Lista não encontrada')
            err.status = 404
            throw err
        }
        return atualizada
    },

    async remover(id) {
        const removida = await wishListModel.remover(id)
        if (!removida) {
            const err = new Error('Lista não encontrada')
            err.status = 404
            throw err
        }
    },
}
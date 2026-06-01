import { itemModel } from '../models/item.js'
import { categoryModel } from '../models/category.js'

const PRIORIDADES = ['alta', 'media', 'baixa']
const STATUS = ['desejado', 'comprado']

export const itemService = {
    async listarTodos(filtros) {
        return itemModel.listarTodos(filtros)
    },

    async buscarPorId(id) {
        const item = await itemModel.buscarPorId(id)
        if (!item) {
            const err = new Error('Item não encontrado')
            err.status = 404
            throw err
        }
        return item
    },

    async criar({ category_id, name, price, priority, status, link }) {
        if (!name) {
            const err = new Error('Campo "name" é obrigatório')
            err.status = 400
            throw err
        }
        if (priority && !PRIORIDADES.includes(priority)) {
            const err = new Error(`"priority" deve ser: ${PRIORIDADES.join(', ')}`)
            err.status = 400
            throw err
        }
        if (status && !STATUS.includes(status)) {
            const err = new Error(`"status" deve ser: ${STATUS.join(', ')}`)
            err.status = 400
            throw err
        }
        if (category_id) {
            const categoria = await categoryModel.buscarPorId(category_id)
            if (!categoria) {
                const err = new Error('Categoria informada não existe')
                err.status = 422
                throw err
            }
        }
        return itemModel.inserir({ category_id, name, price, priority, status, link })
    },

    async atualizar(id, dados) {
        if (dados.priority && !PRIORIDADES.includes(dados.priority)) {
            const err = new Error(`"priority" deve ser: ${PRIORIDADES.join(', ')}`)
            err.status = 400
            throw err
        }
        if (dados.status && !STATUS.includes(dados.status)) {
            const err = new Error(`"status" deve ser: ${STATUS.join(', ')}`)
            err.status = 400
            throw err
        }
        const atualizado = await itemModel.atualizar(id, dados)
        if (!atualizado) {
            const err = new Error('Item não encontrado')
            err.status = 404
            throw err
        }
        return atualizado
    },

    async remover(id) {
        const removido = await itemModel.remover(id)
        if (!removido) {
            const err = new Error('Item não encontrado')
            err.status = 404
            throw err
        }
    },

    async totalEstimado() {
        return itemModel.totalEstimado()
    },
}
import { categoryModel } from '../models/category.js'

export const categoryService = {
    async listarTodas() {
        return categoryModel.listarTodas()
    },

    async buscarPorId(id) {
        const category = await categoryModel.buscarPorId(id)
        if (!category) {
            const err = new Error('Categoria não encontrada')
            err.status = 404
            throw err
        }
        return category
    },

    async criar({ name, icon }) {
        if (!name) {
            const err = new Error('Campo "name" é obrigatório')
            err.status = 400
            throw err
        }
        const existe = await categoryModel.existeNome(name)
        if (existe) {
            const err = new Error('Já existe uma categoria com este nome')
            err.status = 409
            throw err
        }
        return categoryModel.inserir({ name, icon })
    },

    async atualizar(id, dados) {
        const atualizada = await categoryModel.atualizar(id, dados)
        if (!atualizada) {
            const err = new Error('Categoria não encontrada')
            err.status = 404
            throw err
        }
        return atualizada
    },

    async remover(id) {
        const removida = await categoryModel.remover(id)
        if (!removida) {
            const err = new Error('Categoria não encontrada')
            err.status = 404
            throw err
        }
    },
}
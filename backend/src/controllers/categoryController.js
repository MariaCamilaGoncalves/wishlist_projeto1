import { categoryService } from '../services/categoryService.js'

export const categoryController = {
    async listarTodas(req, res) {
        const categories = await categoryService.listarTodas()
        res.json(categories)
    },
    async buscarPorId(req, res) {
        const category = await categoryService.buscarPorId(Number(req.params.id))
        res.json(category)
    },
    async criar(req, res) {
        const nova = await categoryService.criar(req.body)
        res.status(201).json(nova)
    },
    async atualizar(req, res) {
        const atualizada = await categoryService.atualizar(Number(req.params.id), req.body)
        res.json(atualizada)
    },
    async remover(req, res) {
        await categoryService.remover(Number(req.params.id))
        res.status(204).end()
    },
}
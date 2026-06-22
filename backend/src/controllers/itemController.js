import { itemService } from '../services/itemService.js'

export const itemController = {
    async listarTodos(req, res) {
        const items = await itemService.listarTodos(req.query)
        res.json(items)
    },
    async buscarPorId(req, res) {
        const item = await itemService.buscarPorId(Number(req.params.id))
        res.json(item)
    },
    async criar(req, res) {
        const novo = await itemService.criar(req.body)
        res.status(201).json(novo)
    },
    async atualizar(req, res) {
        const atualizado = await itemService.atualizar(Number(req.params.id), req.body)
        res.json(atualizado)
    },
    async remover(req, res) {
        await itemService.remover(Number(req.params.id))
        res.status(204).end()
    },
    async totalEstimado(req, res) {
        const total = await itemService.totalEstimado(req.query.wish_list_id ? Number(req.query.wish_list_id) : null)
        res.json({ total })
    },
}
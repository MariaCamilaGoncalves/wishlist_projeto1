import { priceHistoryService } from '../services/priceHistoryService.js'

export const priceHistoryController = {
    async listarPorItem(req, res) {
        const registros = await priceHistoryService.listarPorItem(Number(req.params.item_id))
        res.json(registros)
    },

    async buscarPorId(req, res) {
        const registro = await priceHistoryService.buscarPorId(Number(req.params.id))
        res.json(registro)
    },

    async registrar(req, res) {
        const novo = await priceHistoryService.registrar(req.body)
        res.status(201).json(novo)
    },

    async remover(req, res) {
        await priceHistoryService.remover(Number(req.params.id))
        res.status(204).end()
    },
}
import { wishListService } from '../services/wishListService.js'

export const wishListController = {
    async listarTodas(req, res) {
        if (req.query.user_id) {
            const listas = await wishListService.listarPorUsuario(Number(req.query.user_id))
            return res.json(listas)
        }
        const listas = await wishListService.listarTodas()
        res.json(listas)
    },

    async buscarPorId(req, res) {
        const lista = await wishListService.buscarPorId(Number(req.params.id))
        res.json(lista)
    },

    async criar(req, res) {
        const nova = await wishListService.criar(req.body)
        res.status(201).json(nova)
    },

    async atualizar(req, res) {
        const atualizada = await wishListService.atualizar(Number(req.params.id), req.body)
        res.json(atualizada)
    },

    async remover(req, res) {
        await wishListService.remover(Number(req.params.id))
        res.status(204).end()
    },
}
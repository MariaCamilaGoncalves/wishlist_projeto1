import { userService } from '../services/userService.js'

export const userController = {
    async listarTodos(req, res) {
        const users = await userService.listarTodos()
        res.json(users)
    },

    async buscarPorId(req, res) {
        const user = await userService.buscarPorId(Number(req.params.id))
        res.json(user)
    },

    async criar(req, res) {
        const novo = await userService.criar(req.body)
        res.status(201).json(novo)
    },

    async atualizar(req, res) {
        const atualizado = await userService.atualizar(Number(req.params.id), req.body)
        res.json(atualizado)
    },

    async remover(req, res) {
        await userService.remover(Number(req.params.id))
        res.status(204).end()
    },
}
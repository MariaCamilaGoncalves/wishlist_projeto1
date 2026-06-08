import { Router } from 'express'
import { itemController } from '../controllers/itemController.js'

const router = Router()

router.get('/total', itemController.totalEstimado)
router.get('/', itemController.listarTodos)
router.get('/:id', itemController.buscarPorId)
router.post('/', itemController.criar)
router.put('/:id', itemController.atualizar)
router.delete('/:id', itemController.remover)

export default router
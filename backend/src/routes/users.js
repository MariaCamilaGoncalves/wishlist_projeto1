import { Router } from 'express'
import { userController } from '../controllers/userController.js'

const router = Router()

router.get('/', userController.listarTodos)
router.get('/:id', userController.buscarPorId)
router.post('/', userController.criar)
router.put('/:id', userController.atualizar)
router.delete('/:id', userController.remover)

export default router
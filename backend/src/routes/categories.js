import { Router } from 'express'
import { categoryController } from '../controllers/categoryController.js'

const router = Router()

router.get('/', categoryController.listarTodas)
router.get('/:id', categoryController.buscarPorId)
router.post('/', categoryController.criar)
router.put('/:id', categoryController.atualizar)
router.delete('/:id', categoryController.remover)

export default router
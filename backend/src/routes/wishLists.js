import { Router } from 'express'
import { wishListController } from '../controllers/wishListController.js'

const router = Router()

router.get('/', wishListController.listarTodas)
router.get('/:id', wishListController.buscarPorId)
router.post('/', wishListController.criar)
router.put('/:id', wishListController.atualizar)
router.delete('/:id', wishListController.remover)

export default router
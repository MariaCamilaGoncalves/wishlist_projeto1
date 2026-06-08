import { Router } from 'express'
import { priceHistoryController } from '../controllers/priceHistoryController.js'

const router = Router()

router.get('/item/:item_id', priceHistoryController.listarPorItem)
router.get('/:id', priceHistoryController.buscarPorId)
router.post('/', priceHistoryController.registrar)
router.delete('/:id', priceHistoryController.remover)

export default router
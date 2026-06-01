import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import itemsRouter from './routes/items.js'
import categoriesRouter from './routes/categories.js'
import { logger } from './middleware/logger.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

app.use('/items', itemsRouter)
app.use('/categories', categoriesRouter)

app.get('/', (req, res) => {
    res.json({ api: 'WishList API', versao: '1.0.0', rotas: ['/items', '/categories', '/items/total'] })
})

app.use(errorHandler)

export default app
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import itemsRouter from './routes/items.js'
import categoriesRouter from './routes/categories.js'
import usersRouter from './routes/users.js'
import wishListsRouter from './routes/wishLists.js'
import priceHistoryRouter from './routes/priceHistory.js'
import { logger } from './middleware/logger.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

app.use('/items', itemsRouter)
app.use('/categories', categoriesRouter)
app.use('/users', usersRouter)
app.use('/wishlists', wishListsRouter)
app.use('/price-history', priceHistoryRouter)

app.get('/', (req, res) => {
    res.json({
        api: 'WishList API',
        versao: '1.0.0',
        rotas: ['/items', '/categories', '/users', '/wishlists', '/price-history', '/items/total'],
    })
})

app.use(errorHandler)

export default app
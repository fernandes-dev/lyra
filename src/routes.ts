import { Router } from 'express'

import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { authRoutes } from './routes/auth.routes'
import { billRoutes } from './routes/bill/bill.routes'
import { userRoutes } from './routes/user/user.routes'

const routes = Router()

routes.use('/user', userRoutes)
routes.use('/auth', authRoutes)
routes.use('/bill', ensureAuthenticated, billRoutes)

export { routes }

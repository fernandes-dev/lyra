import { Router } from 'express'
import { UserController } from '../../controllers/user/UserController'

const userRoutes = Router()
const userController = new UserController()

userRoutes.get('/', userController.index)
userRoutes.post('/', userController.store)

export { userRoutes }
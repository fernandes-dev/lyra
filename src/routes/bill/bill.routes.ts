import { Router } from 'express'
import { BillController } from '../../controllers/bill/BillController'

const billRoutes = Router()
const billController = new BillController()

billRoutes.post('/', billController.store)
billRoutes.get('/', billController.index)
billRoutes.get('/:id', billController.show)

export { billRoutes }
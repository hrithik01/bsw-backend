import express from 'express'
import { paymentsController } from '../controllers/payments.controller.js'
import { checkDeleteAccessKeyMiddleware } from '../utils/middlewares.js'

const paymentsRouter = express.Router()

paymentsRouter.post('/credit', paymentsController.createCredit)
paymentsRouter.get('/credit/:transaction_id', paymentsController.getCreditById)
paymentsRouter.get('/credit/delete/:transaction_id', checkDeleteAccessKeyMiddleware, paymentsController.deleteCreditById)
paymentsRouter.post('/credit/fetch', paymentsController.getCreditEntries)

paymentsRouter.post('/debit', paymentsController.createDebit)
paymentsRouter.get('/debit/:transaction_id', paymentsController.getDebitById)
paymentsRouter.get('/debit/delete/:transaction_id', checkDeleteAccessKeyMiddleware, paymentsController.deleteDebitById)
paymentsRouter.post('/debit/fetch', paymentsController.getDebitEntries)

export default paymentsRouter

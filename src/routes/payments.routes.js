import express from 'express'
import { paymentsController } from '../controllers/payments.controller.js'

const paymentsRouter = express.Router()

paymentsRouter.post('/credit', paymentsController.createCredit)
paymentsRouter.get('/credit/:transaction_id', paymentsController.getCreditById)
paymentsRouter.get('/credit/delete/:transaction_id', paymentsController.deleteCreditById)
paymentsRouter.get('/credit', paymentsController.getCreditEntries)

paymentsRouter.post('/debit', paymentsController.createDebit)
paymentsRouter.get('/debit/:transaction_id', paymentsController.getDebitById)
paymentsRouter.get('/debit/delete/:transaction_id', paymentsController.deleteDebitById)
paymentsRouter.get('/debit', paymentsController.getDebitEntries)

export default paymentsRouter

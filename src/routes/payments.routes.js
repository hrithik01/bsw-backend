import express from 'express'
import { paymentsController } from '../controllers/payments.controller.js'
import { interestController } from '../controllers/interests.controller.js'
import { checkDeleteAccessKeyMiddleware, checkWriteAccessKeyMiddleware } from '../utils/middlewares.js'
import { authMiddleware } from '../utils/authentication.js'

const paymentsRouter = express.Router()

paymentsRouter.post('/credit', authMiddleware, checkWriteAccessKeyMiddleware, paymentsController.createCredit)
paymentsRouter.get('/credit/:transaction_id', authMiddleware, paymentsController.getCreditById)
paymentsRouter.get('/credit/delete/:transaction_id', authMiddleware, checkDeleteAccessKeyMiddleware, paymentsController.deleteCreditById)
paymentsRouter.post('/credit/fetch', authMiddleware,paymentsController.getCreditEntries)

paymentsRouter.post('/debit', checkWriteAccessKeyMiddleware, paymentsController.createDebit)
paymentsRouter.get('/debit/:transaction_id', paymentsController.getDebitById)
paymentsRouter.get('/debit/delete/:transaction_id', checkDeleteAccessKeyMiddleware, paymentsController.deleteDebitById)
paymentsRouter.post('/debit/fetch', paymentsController.getDebitEntries)

paymentsRouter.post('/calculate-interest', authMiddleware, interestController.calculateInterest);

paymentsRouter.post('/all-entries', authMiddleware, interestController.calculateInterest);

export default paymentsRouter

import express from 'express'
import { entitiesController } from '../controllers/entities.controller.js'
import { checkDeleteAccessKeyMiddleware, checkWriteAccessKeyMiddleware } from '../utils/middlewares.js'
import { authMiddleware } from '../utils/authentication.js'

const entitiesRouter = express.Router()

entitiesRouter.post('/', authMiddleware, checkWriteAccessKeyMiddleware, entitiesController.createEntity)
entitiesRouter.get('/', authMiddleware, entitiesController.getEntities)
entitiesRouter.post('/delete',  authMiddleware, checkDeleteAccessKeyMiddleware, entitiesController.deleteEntity)

export default entitiesRouter
import express from 'express'
import { entitiesController } from '../controllers/entities.controller.js'
import { checkDeleteAccessKeyMiddleware, checkWriteAccessKeyMiddleware } from '../utils/middlewares.js'

const entitiesRouter = express.Router()

entitiesRouter.post('/', checkWriteAccessKeyMiddleware, entitiesController.createEntity)
entitiesRouter.get('/', entitiesController.getEntities)
entitiesRouter.post('/delete',  checkDeleteAccessKeyMiddleware, entitiesController.deleteEntity)

export default entitiesRouter
import express from 'express'
import { entitiesController } from '../controllers/entities.controller.js'
import { checkDeleteAccessKeyMiddleware } from '../utils/middlewares.js'

const entitiesRouter = express.Router()

entitiesRouter.post('/', entitiesController.createEntity)
entitiesRouter.get('/', entitiesController.getEntities)
entitiesRouter.post('/delete',  checkDeleteAccessKeyMiddleware, entitiesController.deleteEntity)

export default entitiesRouter
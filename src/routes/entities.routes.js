import express from 'express'
import { entitiesController } from '../controllers/entities.controller.js'

const entitiesRouter = express.Router()

entitiesRouter.post('/', entitiesController.createEntity)
entitiesRouter.get('/', entitiesController.getEntities)
entitiesRouter.post('/delete', entitiesController.deleteEntity)

export default entitiesRouter
import express from 'express'
import { entitiesController } from '../controllers/entities.controller.js'

const entitiesRouter = express.Router()

entitiesRouter.post('/', entitiesController.createEntity)

export default entitiesRouter
import express from 'express'
import { propertyController } from '../controllers/property.controller.js'
import { checkWriteAccessKeyMiddleware } from '../utils/middlewares.js'

const propertyRouter = express.Router()

propertyRouter.post('/', checkWriteAccessKeyMiddleware, propertyController.createProperty)
propertyRouter.get('/', propertyController.getProperties)
propertyRouter.post('/update/:property_id', checkWriteAccessKeyMiddleware, propertyController.updateProperty)

export default propertyRouter
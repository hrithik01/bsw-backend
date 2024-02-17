import express from 'express'
import { propertyController } from '../controllers/property.controller.js'

const propertyRouter = express.Router()

propertyRouter.post('/', propertyController.createProperty)
propertyRouter.get('/', propertyController.getProperties)
propertyRouter.post('/update/:property_id', propertyController.updateProperty)

export default propertyRouter
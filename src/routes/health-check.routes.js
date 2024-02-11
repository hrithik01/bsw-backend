import express from 'express'
import { healthCheckController } from '../controllers/health-check.controller.js'

const healthCheckRouter = express.Router()

healthCheckRouter.get('/health-check', healthCheckController.healthCheck)
healthCheckRouter.get('/version', healthCheckController.getVersions)

export default healthCheckRouter
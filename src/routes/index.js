import express from 'express'
import healthCheckRouter from './health-check.routes.js'

const router = express.Router()

router.use('/api', healthCheckRouter)

export default router 
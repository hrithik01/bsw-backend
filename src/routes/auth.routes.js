import express from 'express';
import { checkWriteAccessKeyMiddleware } from '../utils/middlewares.js';
import { authController } from '../controllers/auth.controller.js';
import { authRL } from '../utils/limiter.js';

const authRouter = express.Router();

authRouter.post('/login', authRL, checkWriteAccessKeyMiddleware, authController.login);
authRouter.post('/signup', authRL, checkWriteAccessKeyMiddleware, authController.signup);

export default authRouter;
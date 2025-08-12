import express from 'express';
import * as authController from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.post('/refresh-token', authController.refreshToken);
authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);

export default authRouter;

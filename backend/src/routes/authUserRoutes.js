import express from 'express';

import { verifyJWT } from '../middlewares/authMiddlewares.js';
import { AuthenticationController } from '../controllers/authController.js';

import { validateCreateUserPayload } from '../middlewares/UsersMiddleware.js';
import { createUserController} from '../controllers/UsersController.js';

const router = express.Router();

router.post('/login', AuthenticationController.login);
router.post('/logout', verifyJWT, AuthenticationController.logout);
router.post('/usuarios', validateCreateUserPayload, createUserController);
router.get('/:userId', verifyJWT, AuthenticationController.me);

export default router;

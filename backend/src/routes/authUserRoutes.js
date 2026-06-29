import express from 'express';

import { verifyJWT } from '../middlewares/authMiddlewares.js';
import { AuthenticationController } from '../controllers/authController.js';

import { validateCreateUserPayload } from '../middlewares/UsersMiddleware.js';
import { createUserController } from '../controllers/UsersController.js';

import { buscarCursosPorUsuariosController } from '../controllers/cursosController.js';

const router = express.Router();

router.post('/login', AuthenticationController.login);
router.post('/logout', verifyJWT, AuthenticationController.logout);
router.post('/usuarios', validateCreateUserPayload, createUserController);
router.get('/me', verifyJWT, AuthenticationController.me);
router.get('/:idUsuario', verifyJWT, buscarCursosPorUsuariosController);

export default router;

import express from 'express';
import { buscarCursosPorUsuariosController, listarCursos } from '../controllers/cursosController.js';
const router = express.Router();

import { buscarCursoPorIdController } from '../controllers/cursosController.js';
import { optionalJWT, verifyJWT } from '../middlewares/authMiddlewares.js';
import { cancelarInscricaoController, inscreverUsuarioNoCursoController } from '../controllers/matriculaController.js';

router.get('/me', verifyJWT, buscarCursosPorUsuariosController);
router.get('/:id', buscarCursoPorIdController);
router.get('/', optionalJWT, listarCursos);

router.post('/:idCurso', verifyJWT, inscreverUsuarioNoCursoController);
router.delete('/:idCurso', verifyJWT, cancelarInscricaoController);



export default router;


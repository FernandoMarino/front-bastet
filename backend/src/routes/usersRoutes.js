import express from 'express';
import { validateCreateUserPayload } from '../middlewares/UsersMiddleware.js';
import { createUserController } from '../controllers/UsersController.js';

const router = express.Router();



router.get('/', (req, res) => {
    res.status(200).json({
        method: req.method,
        path: req.originalUrl + req.path,
    });
});

export default router;

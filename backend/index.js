import 'dotenv/config'

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bootstrap from './src/scripts/bootstrap.js';

import usersRoutes from './src/routes/usersRoutes.js';
import authUserRoutes from './src/routes/authUserRoutes.js';
import cursosRoutes from './src/routes/cursosRoutes.js';

// Importar a conexão com o banco de dados e os modelos
import { sequelize } from './src/models/index.js';
// import { Role, User } from './src/models/index.js';

// Configurar o servidor Express
const app = express();
const PORT = 3333;
const hostname = 'localhost';

// Configurar o middleware express.json() para lidar com JSON
app.use(express.json());

// Configurar o middleware cookie-parser para lidar com cookies
app.use(cookieParser())

// Configurar o CORS para permitir requisições do frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);


// Rotas
app.use("/cursos", cursosRoutes);
app.use("/", authUserRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Algo deu errado!', message: err.message });
});

bootstrap().then(() => {
  app.listen(PORT, hostname, () => {
    console.log(`Servidor express rodando em http://${hostname}:${PORT}`);
  })
});
 


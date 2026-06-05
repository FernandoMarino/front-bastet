import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import apiRoutes from './src/routes/apiRoutes.js';

// Importar a conexão com o banco de dados e os modelos
import { sequelize } from './src/models/index.js';
import { Role, User } from './src/models/index.js';


const app = express();
const PORT = 3333;
const hostname = 'localhost';

app.use(express.json());
app.use(cookieParser)

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

// Definição da rota principal para a API
app.use('/api', apiRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Algo deu errado!' });
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso');

    app.listen(PORT, hostname, () => {
      console.log(`Servidor express rodando em http://${hostname}:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });

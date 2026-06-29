import dotenv from 'dotenv/config';
import { sequelize } from '../models/index.js';
import seed from './seed.js';

// Função para inicializar a conexão com o banco de dados e sincronizar os modelos
export default async function bootstrap() {
    try {
        console.log('Iniciando Conexão com o banco de dados...');
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso');

        if (process.env.DB_BASTET_NODE_ENV === 'production') {
            dbSyncMode = { alter: true }; // Em produção, apenas altera o banco sem apagar dados
            await sequelize.sync(dbSyncMode);
        } else {
            dbSyncMode = { force: true }; // Em desenvolvimento, força a sincronização (apaga e recria tabelas)

            await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
            await sequelize.sync(dbSyncMode);
            await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
        }

        console.log('Banco de dados sincronizado com sucesso');

        // Verifica se a variável de ambiente SEED_ON_BOOTSTRAP está definida como 'true'
        if (dbSyncMode.force) {
            // Chama a função seed para inserir os carga inicial de dados no banco
            await seed();
        }
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    }
}

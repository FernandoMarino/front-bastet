// import  from '../config/database.js';
import { sequelize, Role } from '../models/index.js';

async function insertRoles() {
  try {
    console.log('insertRoles - Start');

    console.log('Conectando ao banco para inserir roles');

    await sequelize.authenticate();

    console.log('Inserindo carga padrão (Roles)...');

    await Role.bulkCreate(
      [
        { id: 1, role_name: 'Admin' },
        { id: 2, role_name: 'Professor' },
        { id: 3, role_name: 'Aluno' },
      ],
      { ignoreDuplicates: true },
    );
  } catch (err) {
    console.error('Erro ao inserir roles:', err);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

insertRoles();
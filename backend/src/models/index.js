import sequelize from '../config/database.js';
import Role from './Role.js';
import User from './user.js';
import Course from './Curso.js';

// Definir associações entre os modelos

/* 
=========================================================
1 - Relacionamento entre User e Role (papel do usuário)
============================================================
*/

// Cada usuário contém um papel (aluno, professor, admin)
User.belongsTo(Role, {
  // O nome do campo de chave estrangeira na tabela de usuários
  foreignKey: 'role_id',

  // O campo na tabela de papéis que é referenciado pela chave estrangeira
  targetKey: 'id',
});

// Cada papel pode ter multiplos usuários associados a ele
Role.hasMany(User, {
  // O nome do campo de chave estrangeira na tabela de usuários
  foreignKey: 'role_id',
  // O campo na tabela de papéis que é referenciado pela chave estrangeira
  sourceKey: 'id',
});

/* 
=========================================================
2 - Relacionamento entre Curso e Professor (Muitos para Um)
============================================================
*/

// Cada curso é ministrado por um professor (User)
Course.belongsTo(User, {

    // O nome do campo de chave estrangeira na tabela de cursos
    as: 'professor', 

    // O campo na tabela de usuários que é referenciado pela chave estrangeira
    foreignKey: 'professor_id', 

    // O campo na tabela de usuários que é referenciado pela chave estrangeira
    targetKey: 'id' 
});

// Cada professor pode ministrar vários cursos
User.hasMany(Course, { as: 'cursosMinistrados', foreignKey: 'professor_id', sourceKey: 'id' });

/* 
=========================================================
3 - Relacionamento entre Curso e Aluno (Muitos para Muitos)
============================================================
*/

export { sequelize, Role, User, Course };

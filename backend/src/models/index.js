import sequelize from '../config/database.js';
import Role from './Role.js';
import User from './user.js';
import Curso from './Curso.js';
import CursoStatus from './CursoStatus.js';
import MatriculaStatus from './MatriculaStatus.js';
import Matricula from './Matricula.js';


// Definir o relacionamento entre User e Role (N:N)
// através da tabela de junção "user_roles"
User.belongsToMany(Role, { through: 'user_roles', foreignKey: 'user_id' });
Role.belongsToMany(User, { through: 'user_roles', foreignKey: 'role_id' });

// Definir o relacionamento entre User e Course (N:N) 
// através da tabela de Matricula
User.belongsToMany(Curso, { through: Matricula, as:'cursos_matriculados', foreignKey: 'aluno_id', otherKey: 'curso_id' });
Curso.belongsToMany(User, { through: Matricula, as: 'alunos', foreignKey: 'curso_id', otherKey: 'aluno_id' });

// Definir o relacionamento entre User e Course (N:N)
// através da tabela de junção "curso_professores"
Curso.belongsToMany(User, { through: 'curso_professores' , foreignKey: 'curso_id' });
User.belongsToMany(Curso, { through: 'curso_professores', foreignKey: 'instrutor_id' });

// Definir o relacionamento entre Curso e CursoStatus (1:N)
// Cada curso pertence a um status, e cada status pode ser atribuído a vários cursos
CursoStatus.hasMany(Curso, { foreignKey: 'status_id' });
Curso.belongsTo(CursoStatus, { foreignKey: 'status_id' });

// Definir o relacionamento entre Matricula e MatriculaStatus (1:N)
// Cada matrícula possui um status, e cada status pode ser atribuído a várias matrículas
MatriculaStatus.hasMany(Matricula, { foreignKey: 'status_id' });
Matricula.belongsTo(MatriculaStatus, { foreignKey: 'status_id' });

// Definir o relacionamento entre Curso e Matricula (1:N)
// Matricula sendo a tabela de alunos inscritos em um curso
Curso.hasMany(Matricula, { foreignKey: 'curso_id', as: 'inscritos' });
Matricula.belongsTo(Curso, { foreignKey: 'curso_id' });



export { sequelize, Role, User, Curso, CursoStatus, MatriculaStatus, Matricula };

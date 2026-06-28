import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Matricula = sequelize.define(
  'Matricula',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    aluno_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    curso_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1, // Definindo o status inicial como "ativo"
    },
    data_cancelamento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    data_termino: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    resultado: {
      type: DataTypes.ENUM('aprovado', 'reprovado', 'pendente'),
      allowNull: true,
      defaultValue: 'pendente',
    },
  },
  {
    tableName: 'matriculas',
    timestamps: true,
    underscored: true,
  },
);

export default Matricula;

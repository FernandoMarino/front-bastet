import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Curso = sequelize.define(
  'Curso',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    data_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duracao_semanas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'cursos',
    timestamps: true,
    underscored: true,
  },
);

export default Curso;
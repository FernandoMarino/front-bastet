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

      set(value) {
        this.setDataValue('nome', value.trim());
      }
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    status_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    capa: {
      type: DataTypes.STRING,
      allowNull: true,
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
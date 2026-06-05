import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      required: true,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    underscored: true,
  },
);

export default User;

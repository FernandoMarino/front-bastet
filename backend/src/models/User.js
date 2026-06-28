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
      allowNull: true,

      set(value) {
        this.setDataValue('nome', value.trim());
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      
      validate: {
        isEmail: true,
      },
      
      set(value) {
        this.setDataValue('email', value.trim().toLowerCase());
      }

    },
    nome_usuario: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: true,

      get: function() {
        const rawValue = this.getDataValue('data_nascimento');
        return rawValue ? rawValue.toISOString().split('T')[0] : null;
      }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    underscored: true,
  },
);

export default User;

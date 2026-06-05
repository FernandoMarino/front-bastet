import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role_name: {
    type: DataTypes.STRING,
    unique: true,
  },

}, 
{
    tableName: 'roles',
    timestamps: true,
    underscored: true,
});

export default Role;
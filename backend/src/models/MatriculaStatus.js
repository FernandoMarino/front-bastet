import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const MatriculaStatus = sequelize.define('matricula_status', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

        set(value) {
            this.setDataValue('status', value.trim().toLowerCase());
        },

        
    },
})

export default MatriculaStatus;
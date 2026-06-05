import 'dotenv/config'

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_BASTET_NAME,
    process.env.DB_BASTET_USER,
    process.env.DB_BASTET_PASS, 
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mariadb',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
    }

)

export default sequelize 
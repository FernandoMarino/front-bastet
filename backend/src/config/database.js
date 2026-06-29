import 'dotenv/config'

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD, 
    {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        dialect: 'mariadb',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
    }

)

export default sequelize;
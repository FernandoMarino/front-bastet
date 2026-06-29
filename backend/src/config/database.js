import 'dotenv/config'

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.MYSQLDATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD, 
    {
        host: process.env.MYSQLHOST,
        port: process.env.MYSQLPORT,
        dialect: 'mariadb',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
    }

)

export default sequelize;
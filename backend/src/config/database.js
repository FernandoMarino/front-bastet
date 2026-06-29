import 'dotenv/config'

import { Sequelize } from "sequelize";

console.log('Conectando ao banco de dados com as seguintes configurações:');
console.log(`Host: ${process.env.MYSQL_HOST}`);
console.log(`Port: ${process.env.MYSQL_PORT}`);
console.log(`Database: ${process.env.MYSQL_DATABASE}`);
console.log(`User: ${process.env.MYSQL_USER}`);

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
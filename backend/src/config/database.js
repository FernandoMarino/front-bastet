import 'dotenv/config';

import { Sequelize } from 'sequelize';

console.log('Conectando ao banco de dados com as seguintes configurações:');
console.log(`Host: ${process.env.MYSQL_URL}`);

const sequelize = new Sequelize(process.env.MYSQL_URL.replace('mysql://', 'mariadb://'), {
    dialect: 'mariadb',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

export default sequelize;

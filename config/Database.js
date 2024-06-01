import { Sequelize } from "sequelize";

const db = new Sequelize('bttwdkly9i244be4opes', 'u4ztzs00qpugtrrd', 'gxCoDPzb1hduM5TQvq5Q', {
    host: 'bttwdkly9i244be4opes-mysql.services.clever-cloud.com',
    dialect: 'mysql'
});

export default db;
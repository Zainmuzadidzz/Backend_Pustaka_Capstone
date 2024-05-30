import { Sequelize } from "sequelize";

const db = new Sequelize('pustaka_capstone', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;
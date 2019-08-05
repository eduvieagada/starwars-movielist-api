const Sequelize = require('sequelize');
const databaseConfig = require('../config/databaseConfig');

const sequelize = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, {
    host: databaseConfig.host,
    dialect: databaseConfig.dialect
});

sequelize.authenticate()
    .then(() => console.log("Connection established successfully"))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
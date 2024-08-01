const { Sequelize } = require("sequelize");

// configuramos la coneccion con la base de datos

const sequelize = new Sequelize('project_management', 'admin', 'admin123', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
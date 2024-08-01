const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

/*
Creamos una tabla para los usuarios de los proyectos.
*/

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { timestamps: false })

module.exports = User
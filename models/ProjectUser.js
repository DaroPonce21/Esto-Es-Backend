const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

/*
Creamos una tabla intermedia para poder asignar a los usuarios a los proyectos usando los ID como referencia
*/


const ProjectUser = sequelize.define('ProjectUser', {
    projectId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Projects',
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
}, { timestamps: false })

module.exports = ProjectUser

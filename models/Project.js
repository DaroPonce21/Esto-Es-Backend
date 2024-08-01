const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const User = require('./User')

/* Definimos el modelo de la base de datos
Requerimos:
- Id como PK (iba a usar UUIDV4, pero creo que para esta demo esta bien el autoincrement)
- Name
- Description
- projectManager (Quien lo crea)
- createdAt (note que hay una fecha de creacion y horario en la imagen de muestra)
- status (lo deje fijo en Enable y Disabled, no se si habia mas opciones o si es libre)
- Eliminamos timestamsps para evitar conflicos con createdAt
*/


const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    projectManager: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Enabled', 'Disabled'),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
}, { timestamps: false })

Project.belongsToMany(User, { through: 'ProjectUser', as: 'users' })
User.belongsToMany(Project, { through: 'ProjectUser', as: 'projects' })

module.exports = Project
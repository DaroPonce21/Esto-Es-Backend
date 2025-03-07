const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./config/database')
const projectRoutes = require('./routes/projects')
const userRoutes = require('./routes/userRoutes')
const setupSwagger = require('./swagger')
require('dotenv').config()

const app = express()

app.use(bodyParser.json())

app.use('/projects', projectRoutes)
app.use('/users', userRoutes)

setupSwagger(app)

const PORT = process.env.PORT || 3000

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}).catch((err) => {
    console.error('No se pudo conectar con la base de datos:', err);
})

const sequelize = require('./config/database');

sequelize.authenticate()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('No se pudo conectar a la base de datos:', err));
const express = require('express');
const app = express();

//Importamos las rutas
app.use(require('./usuario'));
app.use(require('./login'));

module.exports = app;
//cargar modulos
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//cargar rutas
const userRoutes = require('./routes/user.routes');

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS

//rutas
app.use('/', userRoutes);

//export
module.exports = app;
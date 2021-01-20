'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar archivos rutas

//middleware
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//CORS

//rutas
app.get('/', (req, res) => {
    res.status(200).send(
        "<h1>Inicio</h1>"
    );
});

app.get('/test', (req, res) => {
    res.status(200).send({
        message: "Hola mundo"
    });
});

//export
module.exports = app;
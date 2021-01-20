'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
    .then(() => {
        console.log("Conexion establecida")
    
        //crear serv
        app.listen(port, () => {
            console.log("Servidor corriento correctamente");
        })
    })
    .catch(err => console.log(err));
//cargar modulos
const mongoose = require('mongoose');
const app = require('./app');
const port = 8000;

//conectarse a bd
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/users")
    .then(() => {
        console.log("OK - Success to connect to DB");
        app.listen(port, () => {
            console.log(`OK - Serves is running in localhost:${port}`);
        })
    })
    .catch(err => console.log("ERR - Error to connect to DB: ",err));
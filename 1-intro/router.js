module.exports = {
    ruta: (data, callback) => {
        callback(200, {messaje: '/ruta'})
    },
    users: {
        GET: (data, callback) => {
            if(data.index){
                if(userList[data.index]) return callback(200, userList[data.index]);
                else return callback(404, {message: `usuario ${data.index} no encontrado`})
            }
            else return callback(200, userList);
        },
        POST: (data, callback) => {
            userList.push(data.payload);
            callback(201, data.payload);
        }
    },
    notFound: (data, callback) => {
        callback(404, {message: 'pagina no encontrada'})
    }
}

let userList = require('./data').users;
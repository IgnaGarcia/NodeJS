const users = require('./routes/users');
let data = require('./data');

module.exports = {
    users: users(data.users),
    ruta: (data, callback) => callback(200, {messaje: '/ruta'}),
    notFound: (data, callback) => callback(404, {message: 'pagina no encontrada'})
}
const users = require('./routes/users');
let userList = require('./data').users;

module.exports = {
    users: users(userList),
    ruta: (data, callback) => callback(200, {messaje: '/ruta'}),
    notFound: (data, callback) => callback(404, {message: 'pagina no encontrada'})
}
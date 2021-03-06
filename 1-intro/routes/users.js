module.exports = (userList) => { 
    return {
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
        },
        PUT: (data, callback) => {
            if(data.index){
                if(userList[data.index]) {
                    userList[data.index] = data.payload;
                    return callback(200, userList[data.index]);
                }
                else return callback(404, {message: `usuario ${data.index} no encontrado`})
            }
            else return callback(400, {message: "indice no enviado"});
        },
        DELETE: (data, callback) => {
            if(data.index){
                if(userList[data.index]) {
                    userList = userList.filter((_user, index) => index!= data.index);
                    return callback(204, {message: `elemento ${data.index} eliminado`});
                }
                else return callback(404, {message: `usuario ${data.index} no encontrado`})
            }
            else return callback(400, {message: "indice no enviado"});
        }
    };
}
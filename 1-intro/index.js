const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const callbackServer = (req, res) => {
    const urlParsed = url.parse(req.url, true);
    
    //Desglozamiento del url
    const path = urlParsed.pathname.replace(/^\/+|\/+$/g, '');
    const method = req.method.toUpperCase();
    const { query = {} } = urlParsed;
    const { headers = {} } = req;

    // METHOD PUT, Recibir datos por stream
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => buffer += decoder.write(data));
    req.on('end', () => {
        buffer += decoder.end();

        if(headers["content-type"] === "application/json"){
            buffer = JSON.parse(buffer);
        }

        if(path.indexOf('/') >= -1){
            var [path, index] = path.split('/');
        }

        const data = {
            index,
            path,
            query,
            method,
            headers,
            payload: buffer
        };

        let handler;
        if(path && router[path] && router[path][method]) handler = router[path][method];
        else handler = router.notFound;

        handler(data, (status = 200, messaje) => {
            const response = JSON.stringify(messaje);
            res.setHeader("Content-Type", "application/json")
            res.writeHead(status);
            res.end(response)
        })
    });
};

const router = {
    ruta: (data, callback) => {
        callback(200, {messaje: '/ruta'})
    },
    users: {
        GET: (data, callback) => {
            if(data.index){
                if(userList[data.index]) return callback(200, userList[data.index]);
                else return callback(404, {message: `usuario ${index} no encontrado`})
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

const server = http.createServer(callbackServer);

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(8000, () => console.log('Server is ON in http://localhost:8000/'));

let userList = [
    {username: 'nacho', age: 22}, 
    {username: 'juan', age: 19},
    {username: 'paloma', age: 14}
]
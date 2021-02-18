const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const router = require('./router');

const callbackServer = (req, res) => {
    const urlParsed = url.parse(req.url, true);
    
    //Desglozamiento del url
    var path = urlParsed.pathname.replace(/^\/+|\/+$/g, '');
    const method = req.method.toUpperCase();
    const { query = {} } = urlParsed;
    const { headers = {} } = req;

    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => buffer += decoder.write(data));
    req.on('end', () => {
        buffer += decoder.end();

        if(headers["content-type"] === "application/json"){
            buffer = JSON.parse(buffer);
        }
        
        if(path.indexOf("/") >= -1) var [path2, index] = path.split("/");

        const data = {
            path: path2 || path,
            index,
            query,
            method,
            headers,
            payload: buffer
        };

        let handler;
        if(data.path && router[data.path] && router[data.path][method]) handler = router[data.path][method];
        else handler = router.notFound;

        handler(data, (status = 200, messaje) => {
            const response = JSON.stringify(messaje);
            res.setHeader("Content-Type", "application/json")
            res.writeHead(status);
            res.end(response)
        })
    });
};

const server = http.createServer(callbackServer);

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(8000, () => console.log('Server is ON in http://localhost:8000/'));


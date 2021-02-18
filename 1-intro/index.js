const http = require('http');
const requestHandler = require('./request_handler');

const server = http.createServer(requestHandler);

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(8000, () => console.log('Server is ON in http://localhost:8000/'));
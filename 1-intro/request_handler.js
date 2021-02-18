const router = require('./router');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

module.exports = (req, res) => {
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
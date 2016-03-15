var http = require('http');
var fs   = require('fs');

http.createServer((request, response) => {

    if (request.method === 'GET') {
        var filename = require('url').parse(request.url).pathname;
        filename = filename.substring(1); // remove leading '/'

        if (filename === '')
            filename = 'index.html'

        fs.readFile(filename, (err, data) => {
            if (err) { // file not found - issue 404
                response.writeHead(404, {
                    'Content-Type': 'text/html' });
        
                response.write('<h1>404</h1>Page not found');
            } else {
                response.writeHead(200, {
                    'Content-Type': 'text/html',
                    'Content-Length': data.length });
        
                response.write(data);
            }
            response.end();
        });
    }
    
}).listen(6666);

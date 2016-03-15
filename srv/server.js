var http = require('http');
var fs   = require('fs');

http.createServer((request, response) => {

    if (request.method === 'GET') {
        var filename = require('url').parse(request.url).pathname;
        filename = filename.substring(1); // remove leading '/'

        if (filename === '')
            filename = 'index.html'

        fs.readFile(filename, (err, data) => {
            if (err) throw err;
            response.writeHead(200, {
                'Content-Type': 'text/html',
                'Content-Length': data.length });
    
            response.write(data);
            response.end();
        });
    }
    
}).listen(6666);

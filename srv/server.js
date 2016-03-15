Server = (function() {
    var http = require('http');
    var fs   = require('fs');

    var writeError = function() {
        return '<h1>404</h1>Page not found';
    };

    /* writes the HTTP response header */
    var writeHead = function(filename, response) {
        fs.readFile(filename, (err, data) => {
            if (err) { // file not found - issue 404
                response.writeHead(404, {
                    'Content-Type': 'text/html' });
        
                response.write(writeError());
            } else {
                response.writeHead(200, {
                    'Content-Type': 'text/html',
                    'Content-Length': data.length });
        
                response.write(data);
            }
            response.end();
        });
    };

    return {
        /* starts the server */
        start: function(port) {
            http.createServer((request, response) => {
                if (request.method === 'GET') {
                    var getFileName = function() {
                        var filename = require('url').parse(request.url).pathname.substring(1); // remove leading '/'
                
                        return filename === '' ? 'index.html' : filename;
                    };

                    writeHead(getFileName(), response);
                }
            }).listen(port);
        }
    };

});

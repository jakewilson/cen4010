var server = require('./server/server');

server.start(process.env.meatpocalypsePort || 3000);

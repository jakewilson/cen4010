var server = require('./server/server');

server.start(process.env.MEATPOCALYPSE || 3000);

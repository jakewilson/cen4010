var db = require('./server/db');
db.create("meatpocalypse.db");
var server = require('./server/server');

server.start(process.env.meatpocalypsePort || 3000);

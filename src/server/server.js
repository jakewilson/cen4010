var express = require('express');
var db = require('./db');
var bodyParser = require('body-parser');
var app = express();

var urlParser = bodyParser.urlencoded({extended: false});
var running = false;
var server;

db.create('meatpocalypse.db');

app.post('/index.html', urlParser, (req, res, next) => {
    if (!req.body)
        return res.sendStatus(400);
    var user = req.body.user;
    var pass = req.body.pass;
    var msg  = 'Invalid request.';

    if (!user || !pass) {
        res.writeHead(400, {'Content-Type': 'text/html'});
        res.write('You must enter a username and a password');
        res.end();
        return; // don't send another header
    }

    db.getPlayer(user, (err, row) => {
        if (!err) {
            if (row === undefined) {
                msg = 'Username ' + user + ' does not exist.';
            } else {
                if (row.pass === pass) {
                    res.redirect(302, 'game.html');
                    return res.end();
                } else {
                    msg = 'Invalid password.';
                }
            }
        } else {
            console.log(err);
        }
        res.writeHead(400, {'Content-Type': 'text/html'});
        res.write(msg);
        res.end();
    });
});

module.exports = {
  start: function(port) {
    app.use(express.static('src/client/'));
    server = app.listen(port, () => {
      running = true;
    });
  },

  stop: function() {
    if (running) {
      server.close(() => {
        running = false;
      });
    }
  }
}

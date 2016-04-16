var express = require('express');
var db = require('./db');
var bodyParser = require('body-parser');
var app = express();

var urlParser = bodyParser.urlencoded({extended: false});
var running = false;
var server;

db.create('meatpocalypse.db');

app.post('/at/index.html', urlParser, (req, res, next) => {
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

    if(user && pass) {

      db.getPlayer(user, (err, row) => {
        if (err) {
          console.log(err);
          return;
        }
        if (row === undefined) {
          res.writeHead(400, {'Content-Type': 'text/html'});
          res.write('Username "' + user + '" does not exist.');
          res.end();
          return;
        }
        var timeout = 30; //seconds

        if(row.passwordAttempts > 3 && ((+new Date()) - row.lastAttempt)/1000 < timeout) {
          var remaingingTime = parseInt(timeout - ((+new Date()) - row.lastAttempt)/1000);
          res.write("Account '" + user + "' is locked for "+remaingingTime+" seconds.");
          res.end();
          return;
        }
        if (row.password === pass) {
          res.redirect(302, 'game.html?a='+row.playerid);
          db.clearAttempts(row.playerid);
          return res.end();
        } else {

          db.invalidAttempt(row.playerid);
          res.write('Invalid password.');
          res.end();
        }
        res.end();
      });
    }
}).post('/registerPlayer', urlParser, function(req, res, next) {
  db.addPlayer(req.body.user, req.body.pass, function() {
    res.redirect(302, 'at/game.html');
    res.end();
  }, function() {
    res.writeHead(409, {'Content-Type': 'text/html'});
    res.write('Player already exists!');
    res.end();
  });
}).get('/', function(req, res, next) {
  res.redirect(302, 'at/index.html');
  res.end();
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

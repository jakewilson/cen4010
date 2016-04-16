var express = require('express');
var db = require('./db');
var bodyParser = require('body-parser');
var app = express();
var bash = require('child_process').exec;
var urlParser = bodyParser.urlencoded({extended: false});

app.post('/', urlParser, (req, res, next) => {
  bash("git pull -f origin deploy");
  bash("sleep 5; grunt");
  res.sendStatus(200);
  console.log("Pull triggered at " + new Date());
  res.end();
});

app.listen(8888);

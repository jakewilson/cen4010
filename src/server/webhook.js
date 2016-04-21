var express = require('express');
var db = require('./db');
var bodyParser = require('body-parser');
var app = express();
var sh = require('child_process').exec;
var urlParser = bodyParser.urlencoded({extended: false});

app.post('/', urlParser, (req, res, next) => {
  sh("bash -c 'git pull -f origin master'");
  sh("bash -c 'grunt'");
  res.sendStatus(200);
  console.log("Pull triggered at " + new Date());
  res.end();
});

app.listen(8888);

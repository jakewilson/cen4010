var express = require('express');
var app = express();
module.exports = {
  start: function(port) {
    app.use(express.static('src/client/'));
    app.listen(port);
  }
}

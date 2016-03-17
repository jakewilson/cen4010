exports.Server = (function() {
    var express = require('express');
    var app = express();
    return {
        start: function(port) {
            app.use(express.static('client'));
            app.listen(port);
        }
    };
});

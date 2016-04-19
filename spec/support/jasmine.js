var db = require('src/server/db');
describe("The suite", function() {
  beforeSuite(function(done){
    server.start(3000);
    db.clear();
    db.create(done);
  });
});

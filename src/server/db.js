/*
 * For creating a sqlite3 database if it doesn't already exist and
 * adding and getting players
 */
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db_name = 'meatpocalypse.db';
var db_exists = fs.existsSync(db_name);
var createTable = function() {
  if (!db_exists) {
    db.serialize(function() {
      db.run("CREATE TABLE player (user TEXT PRIMARY KEY, pass TEXT)"); // TODO: finish columns
    });
  }
};
var db = new sqlite3.Database(db_name, createTable);
module.exports = {
  /*
   * Adds a player to the database
   */
  addPlayer: function(user, pass) {
    db.serialize(function() {
      db.prepare("INSERT INTO player(user, pass) VALUES (?, ?)").run(user, pass, (err) => {
        console.log(err);
      }).finalize();
      // TODO catch "UNIQUE CONSTRAINT FAILED" to catch duplicate username
    });
  },

  /*
   * Retrieves a player from the database and calls the callback with the row
   */
  getPlayer: function(user, callback) {
    db.serialize(function() {
      db.get("SELECT * FROM player WHERE user = ?", user, (err, row) => {
        if (err) throw err;
        callback.call(this, row);
      });
    });
  },

  close: function() {
    db.close();
  },
}

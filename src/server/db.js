/*
 * For creating a sqlite3 database if it doesn't already exist and
 * adding and getting players
 */
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db, db_created = false;
module.exports = {
  /*
   * Creates the db with the given name
   * If called more than once, nothing will happen
   * @callback: the function to call after creation
   */
  create: function(name, callback) {
    db = new sqlite3.Database(name, () => {
      db.serialize(function() {
        db.run("CREATE TABLE IF NOT EXISTS player (user TEXT PRIMARY KEY, pass TEXT)", () => { // TODO: finish columns
          db_created = true;
          if (callback !== undefined)
            callback.call(this);
        }); 
      });
    });

  },

  /*
   * Adds a player to the database and calls the callback when done
   * TODO: instead accept an object when there are more key/values?
   */
  addPlayer: function(user, pass, callback) {
    if (!db_created)
      return;
    db.serialize(function() {
      db.run("INSERT INTO player(user, pass) VALUES (?, ?)", user, pass, callback);
    });
  },

  /*
   * Retrieves a player from the database and calls the callback with the row
   */
  getPlayer: function(user, callback) {
    if (!db_created)
      return;
    db.serialize(function() {
      db.get("SELECT * FROM player WHERE user = ?", user, (err, row) => {
        if (callback !== undefined)
          callback.call(this, err, row);
      });
    });
  },

  close: function() {
    db.close();
  },
}

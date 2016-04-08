/*
 * For creating a sqlite3 database if it doesn't already exist and
 * adding and getting players
 */
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db, db_created = false;
var dbFileName = "meatpocalypse.db";

module.exports = {
  /*
   * Creates the db with the given name
   * If called more than once, nothing will happen
   * @callback: the function to call after creation
   */
  create: function(name, callback) {
    dbFileName = name || dbFileName;
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
  addPlayer: function(user, pass, callback, failure) {
    if (!db_created)
      throw new Error("Database was not created!");

    this.getPlayer(user, function(err, row) {

      // only add the player if they don't already exist!
      if(row === undefined) {
        db.serialize(function() {
          db.run("INSERT INTO player(user, pass) VALUES (?, ?)", user, pass, callback);
        });
      } else if(failure !== undefined) {
        failure();
      } else {
        throw new Error("Player '" + user + "' already exists! ")
      }
    });
  },

  /**
   * Removes a player from the database
   */
  removePlayer: function(user) {
    db.serialize(function() {
      db.run("DELETE FROM player where user = ?", user);
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

  clear: function() {
    db.serialize(function() {
      db.run("DELETE FROM player");
    });
  },

  close: function() {
    db.close();
  },
}

/*
 * For creating a sqlite3 database if it doesn't already exist and
 * adding and getting players
 */
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db;
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
        db.run("" +
          "create table if not exists players( " +
          "playerid INTEGER PRIMARY KEY AUTOINCREMENT, " +
          "username VARCHAR(255), " +
          "password VARCHAR(255), " +
          "passwordAttempts INT, " +
          "lastAttempt INT" +
          ");"
        );
        db.run('CREATE UNIQUE INDEX if not exists player on players (username);');
        db.run("" +
            "create table if not exists playerStatistics (" +
            "playerid INT," +
            "score INT," +
            "gameTime INT," +
            "carrotsCollected INT," +
            "enemiesKilled INT," +
            "shotsFired INT," +
            "FOREIGN KEY(playerid) REFERENCES players(playerid))" +
            ";",
        () => {
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
    this.getPlayer(user, function(err, row) {

      // only add the player if they don't already exist!
      if(row === undefined) {
        db.serialize(function() {
          db.run("INSERT INTO players(username, password, passwordAttempts, lastAttempt) VALUES (?, ?, 0, 0)", user, pass, callback);
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
      db.run("DELETE FROM players where username = ?", user);
    });
  },

  /*
   * Retrieves a player from the database and calls the callback with the row
   */
  getPlayer: function(user, callback) {
    db.serialize(function() {
      db.get("SELECT * FROM players WHERE username = ?", user, (err, row) => {
        if (callback !== undefined)
          callback.call(this, err, row);
      });
    });
  },

  invalidAttempt: function(playerid) {
    var sql = "UPDATE players " +
      " set passwordAttempts = passwordAttempts+1," +
      " lastAttempt = " + (+new Date()) +
      " where playerid = ?;";
    db.run(sql, playerid);
  },

  clearAttempts: function(playerid) {
    db.run("UPDATE players set passwordAttempts = 0 where playerid = ?", playerid);
  },

  clear: function() {
    db.serialize(function() {
      db.run("DELETE FROM players;");
      db.run("DELETE FROM playerStatistics;");
    });
  },

  close: function() {
    db.close();
  },
}

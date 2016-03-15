/* Database class
 * Class for creating a sqlite3 database if it doesn't already exist and
 * adding and getting players
 */
Database = (function() {
    /* private scope */
    var fs = require('fs');
    var sqlite3 = require('sqlite3').verbose();
    var db_name = process.cwd() + '/meatpocalypse.db';
    var db_exists = fs.existsSync(db_name);

    var createTable = function() {
        if (!db_exists) {
            db.serialize(function() {
                db.run("CREATE TABLE player (user TEXT PRIMARY KEY, pass TEXT)"); // TODO: finish columns
            });
        }
    };

    var db = new sqlite3.Database(db_name, createTable);

    /* public scope */
    return {
        addPlayer: function(user, pass) {
            db.serialize(function() {
                db.prepare("INSERT INTO player(user, pass) VALUES (?, ?)").run(user, pass, (err) => {
                    console.log(err);
                }).finalize();
                // TODO catch "UNIQUE CONSTRAINT FAILED" to catch duplicate username
            });
        },

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
        }
    };
});

"use strict";
var db = require('../src/server/db.js');
var fs = require('fs');

var db_name = 'test.db';

describe("Database", function() {

  afterAll(() => {
    // remove .db file so the next time the test is run it will pass
    fs.unlink(db_name, () => {});
  });

  it("should create a db file", (done) => {
    db.create(db_name, () => {
      fs.access(db_name, fs.F_OK, (err) => {
        expect(err).toBe(null);
        done();
      });
    });
  });

  it("should be able to add and retrieve", (done) => {
    var player = 'jake';
    db.addPlayer(player, '1234', (err) => {
      expect(err).toBe(null);
      db.getPlayer(player, (err, row) => {
        expect(row).toEqual({playerid: 1,
         username: player,
         password: '1234',
         passwordAttempts: 0,
         lastAttempt: 0});
        done();
      });
    });
  });

  it("Should not add the same player twice", function(done) {
    // failure must happen or done is not called and test will fail
    var handleFailure = function(err) {
      if(err) {
        done();
      }
    };
    // One of the following will fail.
    db.addPlayer('jonathan', '1234', handleFailure);
    db.addPlayer('jonathan', '1234', handleFailure);
  });

  it("should not fail on non existent users", (done) => {
    db.getPlayer('martino', (err, row) => {
      expect(row).toBe(undefined);
      done();
    });
  });

  it("should fail if a user is not provided", function(done) {
    db.getPlayer(undefined, (err, row) => {
      expect(err).not.toBe(undefined);
      expect(row).toBe(undefined);
      done();
    });
  });
});

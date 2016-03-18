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
    db.addPlayer('jake', '1234', (err) => {
      expect(err).toBe(null);

      db.getPlayer('jake', (err, row) => {
        expect(row).toEqual({user: 'jake', pass: '1234'});
        done();
      });

    });
  });

  it("should not fail on non existent users", (done) => {
    db.getPlayer('martino', (err, row) => {
      expect(row).toBe(undefined);
      done();
    });
  });
});

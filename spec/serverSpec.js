"use strict";
var server = require("../src/server/server.js");
var http = require('http');
var db = require('../src/server/db.js');
var xhr = require('./support/xhr.js');
var fs = require('fs');
var faker = require('../spec/support/faker.js');

describe("Server", function() {
  var dbName = 'server.db';
  beforeAll(function() {
    db.create(dbName);
    server.start(3000);
  });

  afterAll(function() {
    server.stop();
    db.close();
    fs.unlink(dbName, () => {});
  });

  var assertPlayerExists = function(user, done) {
    db.getPlayer(user, function(err, row) {
      expect(err).toBeFalsy();
      expect(row).toBeTruthy();
      done();
    });
  };

  it("is initializable", function() {
    expect(server).toBeTruthy();
  });

  it("denies bad requests", (done) => {
    http.request({port: 3000, path: '/nonexistent'}, (res) => {
      expect(res.statusCode).toBe(404);
      done(); // let jasmine know that async operations are done
    }).end();
  });

  describe("login component", function() {
    it ("should reject usernames that don't exist", (done) => {
      var msg = 'user=hi&pass=1234';
      var options = {
        port: 3000,
        method: 'POST',
        path: '/at/index.html',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': msg.length
        }
      };
      var req = http.request(options, (res) => {
        expect(res.statusCode).toBe(400); // bad request
        done();
      });
      req.write(msg);
      req.end();
    });

    it("should reject passwords that are incorrect", (done) => {

      var msg = 'user=hi&pass=1234';
      var options = {
        port: 3000,
        method: 'POST',
        path: '/at/index.html',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': msg.length
        }
      };
      var req = http.request(options, (res) => {
        expect(res.statusCode).toBe(400);
        done();
      });
      req.write(msg);
      req.end();
    });
  });

  describe("Player Registration", function() {
    var testUser = 'jonathanIsCool';
    var postData = "user=" + testUser + "&pass=123";
    var http_options = {
      port: 3000,
      method: 'POST',
      path: '/registerPlayer',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length,
      },
    };

    it("properly registers a player", function(done) {
      var req = http.request(http_options, (res) => {
        expect(res.statusCode).toBe(302);

        assertPlayerExists(testUser, done);
      });
      req.write(postData);
      req.end();
    });

    it("Informs user if username has been taken", function(done) {
      var req = http.request(http_options, (res) => {
        var badReq = http.request(http_options, (res) => {
          expect(res.statusCode).toBe(409);
          done();
        });
        badReq.write(postData);
        badReq.end();
      });
      req.write(postData);
      req.end();
    });
  });

  describe("uploading statistics", function() {
    it("can upload stats", function(done) {
      var playerStats = {
        playerid: 100,
        score: 1,
        shotsFired: 2,
        carrotsCollected: 3,
        animalsRescued: 4,
        enemiesKilled: 5,
        accountId: 6,
        time: 7,
      };
      xhr.post('/registerStatistics', playerStats, function(res) {
        expect(res.statusCode).toBe(302);
        done();
      });
    });
  });

  describe("High Scores", function() {
    xit("creates high scores", function(done) {
      var results = [];
      faker.generate(function() {
        db.getHighScores(function(err, row) {
          expect(err).toBe(null);
          results.push(row);
        }, function(err, rowCount) {
          expect(rowCount).toBe(10);
          done();
        });
      });
    });

    xit("can GET /highScore", function(done) {
      xhr.xhr('GET', '/highScore', "", function(res) {
        res.on('data', console.log);
        done();
      });
    });
  });
});

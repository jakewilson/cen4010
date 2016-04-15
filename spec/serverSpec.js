"use strict";
var server = require("../src/server/server.js");
var http = require('http');
var db = require('../src/server/db.js');

describe("Server", function() {
  beforeAll(function() {
    server.start(3000);
    db.create("meatpocalypse.db"); // should *NOT* have to do this...
  });

  afterAll(function() {
    server.stop();
  });

  afterEach(function() {
    db.clear();
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
});

"use strict";
var server = require("../src/server/server.js");
var http = require('http');

describe("Server", function() {
    it("is initializable", function() {
        expect(server).toBeTruthy();
    });

    it("is start and stoppable", (done) => {
        server.start(3000);
        // the server should be listening on port 3000 for http requests
        // we can verify this by creating an http client and sending
        // a get request
        http.request({port: 3000}, (res) => {
            expect(res.statusCode).toBe(200);
            server.stop();
            done(); // let jasmine know that async operations are done
        }).end();

    });

    it("denies bad requests", (done) => {
        server.start(3000);
        http.request({port: 3000, path: '/nonexistent'}, (res) => {
            expect(res.statusCode).toBe(404);
            server.stop();
            done(); // let jasmine know that async operations are done
        }).end();
    });

  describe("login component", function() {
    it ("should reject usernames that don't exist", (done) => {
      server.start(3000);
      var msg = 'user=hi&pass=1234';
      var options = {
        port: 3000,
        method: 'POST',
        path: '/index.html',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': msg.length
        }
      };
      var req = http.request(options, (res) => {
        expect(res.statusCode).toBe(400);

        server.stop();
        done();
      });
      req.write(msg);
      req.end();
    });

    // This will be tested after we have adding new user functionality on the server
    /* it("should reject passwords that are incorrect", (done) => {
      server.start(3000);
      var msg = 'user=hi&pass=1234';
      var options = {
        port: 3000,
        method: 'POST',
        path: '/index.html',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': msg.length
        }
      };
      var req = http.request(options, (res) => {
        expect(res.statusCode).toBe(400);
        server.stop();
        done();
      });
      req.write(msg);
      req.end();
    }); */
  });

  
    
});

var Q = require('q');
var db = require('../../src/server/db.js');

function generateFakeData(callback) {
  function createPlayer(i) {
    var d = Q.defer();
    db.addPlayer("user" + i, "pass"+i, () => {
      d.resolve(i);
    });
    return d.promise;
  }

  function createStat(id) {
    var d = Q.defer();

    var randStats = randStatsForPlayer(id);
    db.addStatistics(randStats, function(err) {
      expect(err).toBe(null);
      d.resolve(id);
    });
    return d.promise;
  }

  for(var i = 1; i <= 20; i++) {
    var promise = createPlayer(i);
    for(var j = 0; j <= 20; j++) {
      promise = promise.then(createStat)
    }

    promise.then(function() {
      var d = Q.defer();
      callback();
      return d.promise;
    }).done();
  }
}

function randStatsForPlayer(i) {
  return {
    playerid: i,
    score: rand(0, 100),
    shotsFired: rand(0, 100),
    carrotsCollected: rand(0, 100),
    animalsRescued: rand(0, 100),
    enemiesKilled: rand(0, 100),
    accountId: rand(0, 100),
    time: rand(0, 100),
  };
}

function rand(x, y) {
  return Math.floor(Math.random() * y) + x
}

module.exports = {
  generate: generateFakeData,
};
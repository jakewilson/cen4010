var PLAYER_HEALTH = 100;

var Player = function(game) {
  Entity.call(this, game, PLAYER_HEALTH);
}

/** Player inherits Entity */
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

/**
 * Creates the Player at the specified location
 * @param x: the x location of the Player
 * @param y: the y location of the Player
 */
Player.prototype.create = function(x, y) {
  Entity.prototype.create.call(this, x, y, 'protagonist', 'walk1.png'); // initialize this._sprite

  this._sprite.animations.add('walk', ['walk2.png', 'walk3.png', 'walk4.png', 'walk1.png']); // TODO change walk animation to be only one step at a time
  this._sprite.animations.add('jump', ['jump1.png', 'walk1.png']);
  this._sprite.animations.add('attack', ['attack2.png', 'attack3.png', 'attack4.png', 'walk1.png']);

  this._game.physics.enable(this._sprite);
  this._sprite.body.gravity = 500; // TODO remove magic number
  this._sprite.body.collideWorldBounds = true;
}

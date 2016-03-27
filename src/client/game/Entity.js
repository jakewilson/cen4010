var Entity = function(game, health) {
  this._game = game;
  this._health = health;
}

/**
 * Kills the Entity
 */
Entity.prototype.kill = function() {
  // TODO remove sprite from screen iff on screen
}

/**
 * Plays the Entity's attack animation
 */
Entity.prototype.attack = function() {
  // TODO play attack animation iff not already playing
}

/**
 * Adds the Entity to the game at the specified coordinates
 * on the specified frame
 * @param x: the x coordinate of the Entity
 * @param y: the y coordinate of the Entity
 * @param sprite: the name of the sprite image
 * @param frame: starting frame of the Entity
 */
Entity.prototype.create = function(x, y, sprite, frame) {
  this._sprite = this._game.add.sprite(x, y, sprite, frame);
  this._created = true;
}

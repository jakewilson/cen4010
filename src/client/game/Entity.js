var Entity = function(game, health) {
  this._game = game;
  this._health = health;
  this._sprite = null;
  this._created = false; // TODO is this needed?

  /**
   * The currently playing animation
   */
  this._currentPlayingAnim = null;

  this._attacking = false;
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
  this._currentPlayingAnim = this._sprite.animations.play('attack', this._ATTACK_SPEED);
  this._attacking = true;
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

/**
 * Adds an animation to the Entity
 * @param name: the name of the animation
 * @param frames: an array of spritesheet frames that comprise the animation
 * @param onComplete: callback function to call when the animation is complete
 */
Entity.prototype.addAnimation = function(name, frames, onComplete) {
  this._sprite.animations.add(name, frames).onComplete.add(onComplete, this);
}

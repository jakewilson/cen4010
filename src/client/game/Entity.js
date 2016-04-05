var Entity = function(game, health, name, walkSpeed, attackSpeed) {
  this._game = game;
  this._health = health;
  this._sprite = null;
  this._direction = 'right';
  this._name = name;
  this._WALK_SPEED = walkSpeed;
  this._ATTACK_SPEED = attackSpeed;
  this._currentPlayingAnim = null;
  this._attacking = false;
  this._bulletPool = null;
}

/**
 * Loads the spritesheets
 */
Entity.prototype.preLoad = function() {
  this._game.load.atlasJSONHash(this._name, './assets/spritesheets/' + this._name + '.png', './assets/spritesheets/' + this._name + '.json');
}

/**
 * Kills the Entity
 */
Entity.prototype.kill = function() {
  // TODO remove sprite from screen iff on screen
  this._sprite.kill();
}

/**
 * Plays the Entity's attack animation
 */
Entity.prototype.attack = function() {
  this._currentPlayingAnim = this._sprite.animations.play('attack' + this._direction, this._ATTACK_SPEED);
  this._attacking = true;
}

/**
 * Adds the Entity to the game at the specified coordinates
 * on the specified frame
 * @param x: the x coordinate of the Entity
 * @param y: the y coordinate of the Entity
 * @param frame: starting frame of the Entity
 */
Entity.prototype.create = function(x, y, frame) {
  this._sprite = this._game.add.sprite(x, y, this._name, frame);
  this._game.physics.enable(this._sprite);
  this._sprite.body.collideWorldBounds = true;
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

/**
 * Creates the Bullet Pool for the Entity
 * @param game: the game object
 * @param path: the path to the bullet image
 */
Entity.prototype.createBulletPool = function(name) {
  this._bulletPool = new BulletPool(this._game, name, this._sprite);
}

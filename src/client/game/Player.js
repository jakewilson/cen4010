
var Player = function(game) {
  this._PLAYER_HEALTH = 100;
  Entity.call(this, game, this._PLAYER_HEALTH);

  this._JUMP_SPEED = 2; // frames per second
  this._WALK_SPEED = 5; // frames per second
  this._ATTACK_SPEED = 5; // frames per second

  /**
   * The currently playing animation
   */
  this._currentPlayingAnim = null;
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

  this._walkAnim = this._sprite.animations.add('walk', ['walk2.png', 'walk3.png', 'walk4.png', 'walk1.png']);
  this._walkAnim.onComplete.add(this._animComplete, this);

  this._jumpAnim = this._sprite.animations.add('jump', ['jump1.png']);
  this._jumpAnim.onComplete.add(this._animComplete, this);

  this._attackAnim = this._sprite.animations.add('attack', ['attack2.png', 'attack3.png', 'attack4.png', 'walk1.png']);
  this._attackAnim.onComplete.add(this._animComplete, this);

  this._game.physics.enable(this._sprite);
  this._sprite.body.collideWorldBounds = true;

  // add keyboard callbacks
  this._game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.jump, this);
  this._game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(this.jump, this);

  this._game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(this.move, this);
  this._game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(this.move, this);

  this._game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(this.move, this);
  this._game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(this.move, this);

  this._game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(this.crouch, this);
  this._game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(this.crouch, this);

  this._game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.attack, this);

  // follow the player
  this._game.camera.follow(this._sprite);
}

/**
 * Plays the Jump animation and gives the player an upward velocity
 */
Player.prototype.jump = function() {
  // jump only needs to make sure attack is not playing first
  if (!this._currentPlayingAnim || this._currentPlayingAnim.name !== 'attack') {
    this._currentPlayingAnim = this._sprite.animations.play('jump', this._JUMP_SPEED);
  }

  // TODO check if player is already in the air
  console.log(this._sprite.body);
  this._sprite.body.velocity.y = -200;
}

/**
 * Moves the Player horizontally
 * @param key: the key that was pressed
 */
Player.prototype.move = function(key) {
  // TODO set the appropriate velocity and animation
  switch (key.keyCode) {
    case Phaser.KeyCode.RIGHT:
    case Phaser.KeyCode.D:
      this._sprite.body.velocity.x = 100;
      break;

    case Phaser.KeyCode.LEFT:
    case Phaser.KeyCode.A:
      this._sprite.body.velocity.x = -100;
      break;

    default: // should never happen
      console.log('how did this happen?: ' + key.keyCode);
      break;
  }

  if (this._currentPlayingAnim === null) { // walk must wait for animation to stop playing
    this._currentPlayingAnim = this._sprite.animations.play('walk', this._WALK_SPEED);
  }
}

Player.prototype.crouch = function() {
  console.log('crouching');
}

/**
 * Sets the attack animation and shoots a projectile
 */
Player.prototype.attack = function() {
  this._currentPlayingAnim = this._sprite.animations.play('attack', this._ATTACK_SPEED);
  // TODO shoot banana
}

/**
 * Called when any Animation completes. Sets the sprite frame
 * to the initial walking frame
 */
Player.prototype._animComplete = function() {
  this._sprite.frameName = 'walk1.png';
  this._currentPlayingAnim = null;
}

Player.prototype.setCollision = function(layer) {
  this._game.physics.arcade.collide(this._sprite, layer);
}

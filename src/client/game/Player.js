
var Player = function(game) {
  this._PLAYER_HEALTH = 100;
  Entity.call(this, game, this._PLAYER_HEALTH);

  this._JUMP_SPEED = 1.5; // frames per second
  this._WALK_SPEED = 5; // frames per second
  this._ATTACK_SPEED = 5; // frames per second
  this._CROUCH_SPEED = 5; // frames per second

  /**
   * The currently playing animation
   */
  this._currentPlayingAnim = null;
  this._jumping = false;
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

  this.addAnimation('walk', ['walk2.png', 'walk3.png', 'walk4.png', 'walk1.png'], this._animComplete);
  this.addAnimation('jump', ['jump1.png'], this._animComplete);
  this.addAnimation('attack', ['attack2.png', 'attack3.png', 'attack4.png', 'walk1.png'], this._animComplete)
  this.addAnimation('crouch', ['crouch1.png'], this._animComplete)

  // add keyboard callbacks
  this.addKeyCallback(Phaser.Keyboard.UP, this.jump);
  this.addKeyCallback(Phaser.Keyboard.W, this.jump);

  this.addKeyCallback(Phaser.Keyboard.RIGHT, this.move, this.moveComplete);
  this.addKeyCallback(Phaser.Keyboard.D, this.move, this.moveComplete);
  this.addKeyCallback(Phaser.Keyboard.LEFT, this.move, this.moveComplete);
  this.addKeyCallback(Phaser.Keyboard.A, this.move, this.moveComplete);

  this.addKeyCallback(Phaser.Keyboard.DOWN, this.crouch, this.crouchComplete);
  this.addKeyCallback(Phaser.Keyboard.S, this.crouch, this.crouchComplete);

  this._game.physics.enable(this._sprite);
  this._sprite.body.collideWorldBounds = true;

  // follow the player
  this._game.camera.follow(this._sprite);
}

/**
 * Adds callback to be called when key is pressed
 * @param key: the key that when pressed will call the callback
 * @param onDown: the function to call when the key is pressed down
 * @param onUp: the function to call when the key is released
 * TODO add onDownCallback for holding down the key
 */
Player.prototype.addKeyCallback = function(key, onDown, onUp) {
  var _key = this._game.input.keyboard.addKey(key);
  if (onDown) {
    _key.onDown.add(onDown, this);
  }
  if (onUp) {
    _key.onUp.add(onUp, this);
  }
}

/**
 * Plays the Jump animation and gives the player an upward velocity
 */
Player.prototype.jump = function() {
  if (!this._jumping) {
    this._jumping = true;

    // jump only needs to make sure attack is not playing first
    if (!this._currentPlayingAnim || this._currentPlayingAnim.name !== 'attack') {
      this._currentPlayingAnim = this._sprite.animations.play('jump', this._JUMP_SPEED);
    }
  
    this._sprite.body.velocity.y = -200;
  }
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

Player.prototype.moveComplete = function() {
  this._sprite.body.velocity.x = 0;
}

/**
 * Plays the crouch animation
 */
Player.prototype.crouch = function() {
  if (!this._currentPlayingAnim || this._currentPlayingAnim.name !== 'attack') {
    this._currentPlayingAnim = this._sprite.animations.play('crouch', this._CROUCH_SPEED);
  }
}

Player.prototype.crouchComplete = function() {
  // TODO is this even needed?
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
  // TODO add collision with enemy sprites here also
  this._game.physics.arcade.collide(this._sprite, layer, null, function(obj1, obj2) {
    this._jumpComplete();
    return true;
  }, this);
}

Player.prototype._jumpComplete = function() {
  if (this._sprite.body.velocity.y === 0) {
    this._jumping = false;
  }
}

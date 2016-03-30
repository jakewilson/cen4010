
var Player = function(game) {
  this._PLAYER_HEALTH = 100;
  Entity.call(this, game, this._PLAYER_HEALTH);

  this._JUMP_SPEED = 1.5; // frames per second
  this._WALK_SPEED = 5; // frames per second
  this._ATTACK_SPEED = 5; // frames per second
  this._CROUCH_SPEED = 5; // frames per second

  this._jumping = false;
  this._cursors = null;
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

  this.addAnimation('walk', ['walk2.png', 'walk3.png', 'walk4.png'], this._animComplete);
  this.addAnimation('jump', ['jump1.png'], this._animComplete);
  this.addAnimation('attack', ['attack2.png', 'attack3.png', 'attack4.png'], this._animComplete)
  this.addAnimation('crouch', ['crouch1.png'], this._animComplete)

  this.createBulletPool('banana');

  this._game.physics.enable(this._sprite);
  this._sprite.body.collideWorldBounds = true;

  this._sprite.body.setSize(5, 58, 13, 3);

  // follow the player
  this._game.camera.follow(this._sprite);

  this._cursors = this._game.input.keyboard.createCursorKeys();
  this._attackButton = this._game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

/**
 * Plays the Jump animation and gives the player an upward velocity
 * // TODO need to redo this whole function - it sucks
 */
Player.prototype.jump = function() {
  if (this._sprite.body.onFloor()) {
    // jump only needs to make sure attack is not playing first
    if (!this._currentPlayingAnim || this._currentPlayingAnim.name !== 'attack') {
      this._currentPlayingAnim = this._sprite.animations.play('jump', this._JUMP_SPEED);
    }
  
    this._sprite.body.velocity.y = -400;
  }
}

/**
 * Moves the Player horizontally
 * @param direction: the direction to move the player
 */
Player.prototype.move = function(direction) {
  // TODO set appropriate animation for walking direction
  if (direction === 'right') {
    this._sprite.body.velocity.x = 250;
  } else if (direction === 'left') {
    this._sprite.body.velocity.x = -250;
  }

  if (this._currentPlayingAnim === null) { // walk must wait for animation to stop playing
    this._currentPlayingAnim = this._sprite.animations.play('walk', this._WALK_SPEED);
  }
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
  Entity.prototype.attack.call(this);
  // TODO add player direction
  this._bulletPool.fireBullet(this._sprite.x + (this._sprite.width / 2), this._sprite.y + (this._sprite.height / 4));
}

Player.prototype.attackComplete = function() {
  // TODO
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
  this._game.physics.arcade.collide(this._sprite, layer);
}

Player.prototype.update = function() {
  // TODO
  this._sprite.body.velocity.x = 0;

  if (this._attackButton.isDown) {
    this.attack();
  }

  if (this._cursors.right.isDown) {
    this.move('right')
  } else if (this._cursors.left.isDown) {
    this.move('left')
  }

  if (this._cursors.up.isDown) {
    this.jump();
  }
}

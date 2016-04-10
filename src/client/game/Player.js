var Player = function(game) {
  this._STARTING_HEALTH = 3;
  this._MAX_HEALTH = 6;
  Entity.call(this, game, 'protagonist', this._STARTING_HEALTH, 5, 5);
  this._JUMP_FPS = 1.5; // frames per second
  this._WALK_SPEED = 250;
  this._score = 0;
  this._jumping = false;
  this._sprinting = false;
  this._cursors = null;
  this._healthPool = null;
  this._healthY = 10;
  this._healthX = 30;
  this._tofuTextOffset = 18;
  this._scoreTextOffset = 425;
  this._carrotTextOffset = 48;
  this._carrotsCollected = 0;
}

/** Player inherits Entity */
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

var scoreText, carrotSprite, carrotText;

Player.prototype.preLoad = function() {
  Entity.prototype.preLoad.call(this);
  this._game.load.image('banana', './assets/spritesheets/banana.png');
}

/**
 * Creates the Player at the specified location
 * @param x: the x location of the Player
 * @param y: the y location of the Player
 */
Player.prototype.create = function(x, y) {
  Entity.prototype.create.call(this, x, y, 'walkright1.png'); // initialize this._sprite

  this.addAnimation('walkright', ['walkright2.png', 'walkright3.png', 'walkright4.png'], this._animComplete);
  this.addAnimation('jumpright', ['jumpright1.png'], this._animComplete);
  this.addAnimation('attackright', ['attackright2.png', 'attackright3.png', 'attackright4.png'], this._animComplete)

  this.addAnimation('walkleft', ['walkleft2.png', 'walkleft3.png', 'walkleft4.png'], this._animComplete);
  this.addAnimation('jumpleft', ['jumpleft1.png'], this._animComplete);
  this.addAnimation('attackleft', ['attackleft2.png', 'attackleft3.png', 'attackleft4.png'], this._animComplete)

  this.createBulletPool('banana');

  this._sprite.body.setSize(5, 58, 30, 3);

  // follow the player
  this._game.camera.follow(this._sprite);

  this._sprintButton = this._game.input.keyboard.addKey(Phaser.Keyboard.D);
  this._sprintButton.onDown.add(this._sprint, this);

  this._cursors = this._game.input.keyboard.createCursorKeys();
  this._attackButton = this._game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  var textStyle = { font: "18px Arial", fill: "#00ff00", align: "left"};
  scoreText = this._game.add.text(this._scoreTextOffset, 18, 'Score: ', textStyle);
  scoreText.fixedToCamera = true;

  carrotSprite = this._game.add.sprite(18, 48, 'carrot');
  carrotSprite.fixedToCamera = true;

  carrotText = this._game.add.text(this._carrotTextOffset, 58, 'x ' + this._carrotsCollected, textStyle);
  carrotText.fixedToCamera = true;


  this._createHealthPool();
  this._drawHealth();
}

/**
 * Plays the Jump animation and gives the player an upward velocity
 * // TODO need to redo this whole function - it sucks
 */
Player.prototype.jump = function() {
  if (this._sprite.body.onFloor()) {
    // jump only needs to make sure attack is not playing first
    if (!this._currentPlayingAnim || this._currentPlayingAnim.name.indexOf('attack') < 0) {
      this._currentPlayingAnim = this._sprite.animations.play('jump' + this._direction, this._JUMP_FPS);
    }
  
    this._sprite.body.velocity.y = -400;
  }
}

/**
 * Moves the Player horizontally
 * @param direction: the direction to move the player
 */
Player.prototype.move = function(direction) {
  if (direction === 'right') {
    this._direction = 'right'; 
    this._sprite.body.velocity.x = this._WALK_SPEED;
  } else if (direction === 'left') {
    this._direction = 'left';
    this._sprite.body.velocity.x = -1 * this._WALK_SPEED;
  }

  if (this._currentPlayingAnim === null || this._currentPlayingAnim.name.indexOf('walk') >= 0) {
    this._currentPlayingAnim = this._sprite.animations.play('walk' + this._direction, this._WALK_FPS);
  }
}

/**
 * Sets the attack animation and shoots a projectile
*/
Player.prototype.attack = function() {
  Entity.prototype.attack.call(this);
  var offset = (this._direction === 'left') ? 0 : (3 * (this._sprite.width / 4));
  this._bulletPool.fireBullet(this._sprite.x + offset, this._sprite.y + (this._sprite.height / 4), this._direction);
}

/**
 * Called when any Animation completes. Sets the sprite frame
 * to the initial walking frame
 */
Player.prototype._animComplete = function() {
  this._sprite.frameName = 'walk' + this._direction + '1.png';
  this._currentPlayingAnim = null;
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

  scoreText.text = 'Score: ' + this._score;
  carrotText.text = 'x ' + this._carrotsCollected;
}

Player.prototype._sprint = function() {
	if (!this._sprinting) {
		this._WALK_SPEED = this._WALK_SPEED * 5;
 		this._sprinting = true; 
	} else {
		this._WALK_SPEED = this._WALK_SPEED / 5;
 		this._sprinting = false; 
	}
}

/**
 * Increases the score by the amount specified
 *
 * @param amt: the amount to increase the score by
 * @return: the new score
 */
Player.prototype.updateScore = function(amt) {
  if (amt)
    this._score += amt;

  return this._score;
}


Player.prototype._createHealthPool = function() {
  this._healthPool = this._game.add.group();
  for (var i = 0; i < this._MAX_HEALTH; i++) {
    var child = this._healthPool.create(this._healthX * i + this._tofuTextOffset, this._healthY, 'tofu');
  }
  this._healthPool.setAll('fixedToCamera', true);
}

/**
 * Draws the players health as tofu cubes at the top left of the screen
 */
Player.prototype._drawHealth = function() {
  this._healthPool.callAll('kill');
  for (var i = 0; i < this._health; i++) {
    var child = this._healthPool.getChildAt(i);
    child.reset(this._healthX * i, this._healthY);
  }
}

/**
 * Updates the players health by the specified amount
 *
 * @param amt: the amount to increase the health by
 * @return: the new health
 */
Player.prototype.updateHealth = function(amt) {
  if (amt) {
    this._health += amt;
    this._drawHealth();
  }

  return this._health;
}

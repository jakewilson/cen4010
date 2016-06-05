var Player = function(game) {
  this._accountId = parseInt(window.location.search.split('=')[1]);
  this._STARTING_HEALTH = 3;
  this._MAX_HEALTH = 6;
  Entity.call(this, game, 'protagonist', this._STARTING_HEALTH, 5, 5, 1500);
  this._JUMP_FPS = 1.5; // frames per second
  this._jumping = false;
  this._god = false;
  this._cursors = null;
  this._healthPool = null;
  this._healthY = 10;
  this._healthX = 30;
  this._tofuTextOffset = 18;

  this._score = 0;
  this._scoreTextOffset = 425;

  this._shotsFired = 0;
  this._carrotsCollected = 0;
  this._animalsRescued = 0;
  this._carrotMultiplier = 10;
  this._animalMultiplier = 100;
  this._enemiesKilled = 0;
  this._enemyMultiplier = 20;

  this._carrotTextOffset = 48;
}

/** Player inherits Entity */
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

var scoreText, carrotSprite, carrotText;

Player.prototype.preLoad = function() {
  Entity.prototype.preLoad.call(this);
  this._game.load.image('banana', './assets/spritesheets/banana.png');
}

Player.prototype.kill = function() {
  Entity.prototype.kill.call(this);
  this._game.state.start('deathScreen');
  console.log('game over!');
}

/**
 * Creates the Player at the specified location
 * @param x: the x location of the Player
 * @param y: the y location of the Player
 */
Player.prototype.create = function(x, y) {
  Entity.prototype.create.call(this, x, y, 'walkright1.png'); // initialize this._sprite

  this.createBulletPool('banana');

  this._sprite.body.setSize(5, 58, 30, 3);
  this._sprite.body.gravity.y = 300;

  // follow the player
  this._game.camera.follow(this._sprite);

  this._godButton = this._game.input.keyboard.addKey(Phaser.Keyboard.G);
  this._godButton.onDown.add(this._godMode, this);

  this._walkRight = this._game.input.keyboard.addKey(Phaser.Keyboard.D);
  this._walkLeft = this._game.input.keyboard.addKey(Phaser.Keyboard.A);
  this._jumpKey = this._game.input.keyboard.addKey(Phaser.Keyboard.W);

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
 * Sets the attack animation and shoots a projectile
*/
Player.prototype.attack = function() {
  Entity.prototype.attack.call(this);
  var offset = (this._direction === 'left') ? 0 : (3 * (this._sprite.width / 4));
  var shot = this._bulletPool.fireBullet(this._sprite.x + offset,
    this._sprite.y + (this._sprite.height / 4),
    this._direction);
  if(shot) {
    this._shotsFired += 1;
  }
}

Player.prototype.update = function() {
  Entity.prototype.update.call(this);

  if (this._attackButton.isDown) {
    this.attack();
  }
  
  if (this._cursors.right.isDown || this._walkRight.isDown) {
    this.move('right')
  } else if (this._cursors.left.isDown || this._walkLeft.isDown) {
    this.move('left')
  }

  if (this._cursors.up.isDown || this._jumpKey.isDown) {
    this.jump();
  }

  scoreText.text = 'Score: ' + this.getScore();
  carrotText.text = 'x ' + this._carrotsCollected;
}

Player.prototype._godMode = function() {
  if (!this._god) {
    //Uncomment this line to add in increased speed
    this._WALK_SPEED = this._WALK_SPEED * 5;
    this._god = true;
  } else {
    //Uncomment this line to reduce speed when exiting god mode
    this._WALK_SPEED = this._WALK_SPEED / 5;
    this._god = false;
  }
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
 * Heals the player by the specified amount 
 * @return: the new health
 */
Player.prototype.heal = function() {
  this._health += 1;
  this._drawHealth();
  return this._health;
}

/**
 * Calls entity's hurt function and redraws the player's health
 */
Player.prototype.hurt = function() {
  if (!this._god) {
    Entity.prototype.hurt.call(this);
    this._drawHealth();
  }
}

Player.prototype.getCarrotsCollected = function() {
  return this._carrotsCollected;
}

Player.prototype.getRescuedAnimals = function() {
  return this._animalsRescued;
}

Player.prototype.registerCarrotCollected = function() {
  this._carrotsCollected++;
}

Player.prototype.registerAnimalRescued = function() {
  this._animalsRescued++;
}

Player.prototype.enemyKilled = function(type) {
  this._enemiesKilled++;
}

Player.prototype.getScore = function() {
  return (this._carrotsCollected * this._carrotMultiplier) +
    (this._animalsRescued * this._animalMultiplier) +
    (this._enemiesKilled * this._enemyMultiplier);
}

Player.prototype.getStats = function() {
  return {
    score: this.getScore(),
    shotsFired: this._shotsFired,
    carrotsCollected: this._carrotsCollected,
    animalsRescued: this._animalsRescued,
    enemiesKilled: this._enemiesKilled,
    playerid: this._accountId,
    time: this._game.getElapsedTime(),
  }
}

Player.prototype.render = function() {
  //this._game.debug.bodyInfo(this._sprite, 100, 100);
}

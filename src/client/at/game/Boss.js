var Boss = function(game) {
  this._ENEMY_HEALTH = 10;
  Enemy.call(this, game, 'boss', this._ENEMY_HEALTH, 32, 150);
  this._WALK_SPEED = 200;
  this._STATES.CHARGE = 3;
  this._healthPool = null;
  this._healthOneY = 90;
  this._healthTwoY = this._healthOneY + 20;
  this._healthX = 10300;
  this._drumstickTextOffset = 18;
}

var nameText;

// Boss inherits from Enemy
Boss.prototype = Object.create(Enemy.prototype);
Boss.prototype.constructor = Boss;

Boss.prototype.preLoad = function() {
  Entity.prototype.preLoad.call(this);
  this._game.load.image('drumstick', './assets/spritesheets/drumstick.png');
}

Boss.prototype.kill = function() {
  Enemy.prototype.kill.call(this);
  // TODO switch to `victory` state here
  this._game.state.start('victoryScreen');
}

Boss.prototype.update = function(player) {
  if (!Enemy.prototype.update.call(this)) return;
  switch (this._state) {
    case this._STATES.PATROL:
      this.patrol();
      break;

    case this._STATES.ATTACK:
      this.attack('melee' + this._direction);
      break;
  }

  this._state = this.playerInRange(player, null, player.getSprite().height * 2) && this.facingPlayer(player) ? this._STATES.ATTACK : this._STATES.PATROL;
}

Boss.prototype.patrol = function() {
  this.move(this._direction);
  this.attack('range' + this._direction, 2);
  var offset = (this._direction === 'left') ? 0 : (3 * (this._sprite.width / 4));
  this._bulletPool.fireBullet(this._sprite.x + offset, this._sprite.y, this._direction);
}

Boss.prototype.create = function(x, y, frame) {
  Enemy.prototype.create.call(this, x, y, frame);

  this.createBulletPool('drumstick', true);
  this._bulletPool.setFireRate(1500);

  // add extra animations
  this.addAnimation('meleeleft', ['meleeleft1.png', 'meleeleft2.png', 'meleeleft3.png'], this._animComplete);
  this.addAnimation('rangeleft', ['rangeleft1.png', 'rangeleft2.png'], this._animComplete);

  this.addAnimation('meleeright', ['meleeright1.png', 'meleeright2.png', 'meleeright3.png'], this._animComplete);
  this.addAnimation('rangeright', ['rangeright1.png', 'rangeright2.png'], this._animComplete);

  this._sprite.body.setSize(47, 80, 60, 15);
  nameText = this._game.add.text(this._healthX - 10, this._healthOneY - 25, 'Salem Guido', { font: "18px Arial", fill: "#CC0000", align: "left"}); 
  this._createHealthPool();
  this._drawHealth();
}

Boss.prototype._createHealthPool = function() {
  this._healthPool = this._game.add.group();
  for (var i = 0; i < this._ENEMY_HEALTH; i++) {
    if (i < 5) {
      var child = this._healthPool.create(this._healthX + this._drumstickTextOffset * i, this._healthOneY, 'drumstick');
    } else {
      var child = this._healthPool.create(this._healthX + this._drumstickTextOffset * (i - 5), this._healthTwoY, 'drumstick');
    }
  }
}

/**
 * Draws the boss's health as drumsticks at the top left of the screen
 */
Boss.prototype._drawHealth = function() {
  this._healthPool.callAll('kill');
  for (var i = 0; i < this._health; i++) {
    var child = this._healthPool.getChildAt(i);
     if (i < 5) {
      child.reset(this._healthX + this._drumstickTextOffset * i, this._healthOneY);
    } else {
      child.reset(this._healthX + this._drumstickTextOffset * (i - 5), this._healthTwoY);
    }
  }
}

Boss.prototype.hurt = function() {
    Entity.prototype.hurt.call(this);
    this._drawHealth();
}


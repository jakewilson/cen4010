var Boss = function(game) {
  this._ENEMY_HEALTH = 10;
  Enemy.call(this, game, 'boss', this._ENEMY_HEALTH, 32, 150);
  this._WALK_SPEED = 200;
  this._STATES.CHARGE = 3;
}

// Boss inherits from Enemy
Boss.prototype = Object.create(Enemy.prototype);
Boss.prototype.constructor = Boss;

Boss.prototype.update = function(player) {
  if (!Enemy.prototype.update.call(this)) return;
  switch (this._state) {
    case this._STATES.PATROL:
      this.move(this._direction);
      break;

    case this._STATES.ATTACK:
      this.attack('melee' + this._direction);
      break;
  }

  this._state = this.playerInRange(player, null, player.getSprite().height * 2) && this.facingPlayer(player) ? this._STATES.ATTACK : this._STATES.PATROL;
}

Boss.prototype.create = function(x, y, frame) {
  Enemy.prototype.create.call(this, x, y, frame);

  // add extra animations
  this.addAnimation('meleeleft', ['meleeleft1.png', 'meleeleft2.png', 'meleeleft3.png'], this._animComplete);
  this.addAnimation('rangeleft', ['rangeleft1.png', 'rangeleft2.png', 'rangeleft3.png'], this._animComplete);

  this.addAnimation('meleeright', ['meleeright1.png', 'meleeright2.png', 'meleeright3.png'], this._animComplete);
  this.addAnimation('rangeright', ['rangeright1.png', 'rangeright2.png', 'rangeright3.png'], this._animComplete);

  // TODO set size
}


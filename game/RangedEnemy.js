var RangedEnemy = function(game, patrolRange, startingDir) {
  Enemy.call(this, game, 'ranger', 2, 32 * 8, 100, patrolRange, startingDir);
}

// RangedEnemy inherits from Enemy
RangedEnemy.prototype = Object.create(Enemy.prototype);
RangedEnemy.prototype.constructor = RangedEnemy;

RangedEnemy.prototype.preLoad = function() {
  Enemy.prototype.preLoad.call(this);
}


RangedEnemy.prototype.update = function(player) {
  if (!Enemy.prototype.update.call(this)) return;
  switch (this._state) {
    case this._STATES.PATROL:
      if (this._MAX_PATROL_DIST > 0) {
        this._patrol();
      }
      break;

    case this._STATES.ATTACK:
      this.attack();
      break;
  }

  this._state = this.playerInRange(player, null, player.getSprite().height * 2) && this.facingPlayer(player) ? this._STATES.ATTACK : this._STATES.PATROL;
}


RangedEnemy.prototype.create = function(x, y, frame) {
  Enemy.prototype.create.call(this, x, y, frame);
  this._sprite.body.setSize(33, 67, 33, 10);
  this.createBulletPool('meat');
  this._bulletPool.setFireRate(1000);
}

RangedEnemy.prototype.attack = function() {
  Enemy.prototype.attack.call(this);
  var offset = (this._direction === 'left') ? 0 : (3 * (this._sprite.width / 4));
  this._bulletPool.fireBullet(this._sprite.x + offset, this._sprite.y + (this._sprite.height / 4), this._direction);
}

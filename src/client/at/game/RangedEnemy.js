var RangedEnemy = function(game, patrolDistance) {
  Enemy.call(this, game, 'ranger', 2, 32 * 7, 100);
}

// RangedEnemy inherits from Enemy
RangedEnemy.prototype = Object.create(Enemy.prototype);
RangedEnemy.prototype.constructor = RangedEnemy;

RangedEnemy.prototype.preLoad = function() {
  Enemy.prototype.preLoad.call(this);
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

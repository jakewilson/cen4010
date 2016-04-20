var MeleeEnemy = function(game) {
  this._ENEMY_HEALTH = 3;
  Enemy.call(this, game, 'butcher', this._ENEMY_HEALTH, 32, 150);
}

// Enemy inherits from Entity
MeleeEnemy.prototype = Object.create(Enemy.prototype);
MeleeEnemy.prototype.constructor = MeleeEnemy;

MeleeEnemy.prototype.create = function(x, y, frame) {
  Entity.prototype.create.call(this, x, y, frame);
  this._sprite.body.setSize(29, 59, 18, 28);
}

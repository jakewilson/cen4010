var RangedEnemy = function(game) {
  this._ENEMY_HEALTH = 200;
  Entity.call(this, game, 'ranger', this._ENEMY_HEALTH, 5, 5);
}

// Enemy inherits from Entity
RangedEnemy.prototype = Object.create(Entity.prototype);
RangedEnemy.prototype.constructor = RangedEnemy;

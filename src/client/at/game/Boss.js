var Boss = function(game) {
  this._ENEMY_HEALTH = 10;
  Enemy.call(this, game, 'boss', this._ENEMY_HEALTH, 32, 150);
  this._STATES.CHARGE = 3;
}

// Boss inherits from Enemy
Boss.prototype = Object.create(Enemy.prototype);
Boss.prototype.constructor = Boss;

Boss.prototype.update = function(player) {
}

Boss.prototype._charge = function() {
  this._WALK_SPEED = 200;
  this.move(this._direction);
}


Boss.prototype.create = function(x, y, frame) {
  Enemy.prototype.create.call(this, x, y, frame);
  // TODO set size
}

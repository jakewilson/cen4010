var MeleeEnemy = function(game, patrolRange, startingDir) {
  this._ENEMY_HEALTH = 3;
  Enemy.call(this, game, 'butcher', this._ENEMY_HEALTH, 32, 150, patrolRange, startingDir);
  this._STATES.CHARGE = 3;
  this._VISION = 32 * 5; // butcher can see 5 tiles
}

// MeleeEnemy inherits from Enemy
MeleeEnemy.prototype = Object.create(Enemy.prototype);
MeleeEnemy.prototype.constructor = MeleeEnemy;

MeleeEnemy.prototype.update = function(player) {
  if (!Enemy.prototype.update.call(this)) return;
  switch (this._state) {
    case this._STATES.PATROL:
      this._WALK_SPEED = 150;
      if (this._MAX_PATROL_DIST > 0) {
        this._patrol();
      }
      break;

    case this._STATES.CHARGE:
      this._charge();
      break;

    case this._STATES.ATTACK:
      this.attack();
      break;
  }

  this._state = this._STATES.PATROL;
  if (this.facingPlayer(player)) {
    if (this.playerInRange(player, this._ATTACK_RANGE)) {
      this._state = this._STATES.ATTACK;
    } else if (this.playerInRange(player, this._VISION)) {
      this._state = this._STATES.CHARGE;
    }
  }

}

MeleeEnemy.prototype._charge = function() {
  this._WALK_SPEED = 200;
  this.move(this._direction);
}


MeleeEnemy.prototype.create = function(x, y, frame) {
  Enemy.prototype.create.call(this, x, y, frame);
  this._sprite.body.setSize(29, 59, 10, 28);
}

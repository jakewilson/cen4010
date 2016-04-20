var Enemy = function(game, name, health, attackRange, walkSpeed) {
  Entity.call(this, game, name, health, 5, 5, 500);
  this._ATTACK_RANGE = attackRange;
  this._WALK_SPEED = walkSpeed;
  this._STATES = {
    IDLE: 0,
    PATROL: 1,
    ATTACK: 2
  };
  this._state = this._STATES.IDLE;
  this._direction = 'left';
}

// Enemy inherits from Entity
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.preLoad = function() {
  Entity.prototype.preLoad.call(this);
}

Enemy.prototype.create = function(x, y, frame) {
  Entity.prototype.create.call(this, x, y, frame);
  this._sprite.body.immovable = true;
  this._state = this._STATES.PATROL;
}

/**
 * Sets a collision with the ranged enemy and the player
 */
Enemy.prototype.setCollisionWithPlayer = function(player) {
  var onCollision = function(player_sprite, enemy_sprite) {
     player.hurt();
  };
  this._game.physics.arcade.collide(player.getSprite(), this._sprite, onCollision);
}

Enemy.prototype.update = function(player) {
  if (!this._sprite.visible) return;
  Entity.prototype.update.call(this);
  switch (this._state) {
    case this._STATES.PATROL:
      this._patrol();
      break;

    case this._STATES.ATTACK:
      this.attack();
      break;
  }

  this._state = this.playerInRange(player) && this.facingPlayer(player) ? this._STATES.ATTACK : this._STATES.PATROL;
}

/**
 * Walk back and forth until encountering the player
 */
Enemy.prototype._patrol = function() {
  if (Math.abs(this._totalDist) > this._MAX_PATROL_DIST) {
    Entity.prototype.switchDirection.call(this);
  }
  this.move(this._direction);
  this._totalDist += this._sprite.body.deltaX();
}

/**
 * Face the player before attacking
 */
Enemy.prototype.facingPlayer = function(player) {
  // get the relative location of the player to the enemy
  var playerDirection = this._sprite.body.x - player.getSprite().body.x > 0 ? 'left' : 'right';
  return playerDirection === this._direction;
}

Enemy.prototype.playerInRange = function(player) {
  return this._game.physics.arcade.distanceBetween(player.getSprite(), this._sprite) <= this._ATTACK_RANGE;
}

Enemy.prototype.render = function() {
  // for some reason these are only true in render, not in update
  if (this._sprite !== null && this._sprite.body.blocked.left || this._sprite.body.blocked.right) {
    Entity.prototype.switchDirection.call(this);
  }
  //this._game.debug.bodyInfo(this._sprite, 100, 100);
}

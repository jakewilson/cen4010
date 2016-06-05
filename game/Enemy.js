var Enemy = function(game, name, health, attackRange, walkSpeed, patrolRange, startingDir) {
  Entity.call(this, game, name, health, 5, 5, 500);
  this._ATTACK_RANGE = attackRange;
  this._WALK_SPEED = walkSpeed;
  this._STATES = {
    IDLE: 0,
    PATROL: 1,
    ATTACK: 2,
    CINEMATIC: 3
  };
  this._state = this._STATES.IDLE;
  this._direction = startingDir || 'left';
  this._totalDist = 0;
  this._MAX_PATROL_DIST = 32 * (patrolRange || 5);
}

// Enemy inherits from Entity
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.preLoad = function() {
  Entity.prototype.preLoad.call(this);
}

Enemy.prototype.create = function(x, y, frame) {
  frame = frame || 'walk' + this._direction + '1.png';
  Entity.prototype.create.call(this, x, y, frame);
  this._sprite.body.immovable = true;
  this._state = this._STATES.PATROL;
}

Enemy.prototype.update = function() {
  if (!this._sprite.visible) return false;
  Entity.prototype.update.call(this);
  return true;
}

/**
 * Sets a collision with the ranged enemy and the player
 */
Enemy.prototype.setCollisionWithPlayer = function(player) {
  var onOverlap = function(player_sprite, enemy_sprite) {
     player.hurt();
  };
  this._game.physics.arcade.overlap(player.getSprite(), this._sprite, onOverlap);
}

/**
 * Walk back and forth until encountering the player
 */
Enemy.prototype._patrol = function() {
  if (Math.abs(this._totalDist) > this._MAX_PATROL_DIST) {
    this.switchDirection();
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

/**
 * Returns true if the player is within the range specified
 * @param player: the player to check
 * @param range: the range to check if within. NOTE: defaults to this._ATTACK_RANGE
 */
Enemy.prototype.playerInRange = function(player, xRange, yRange) {
  xRange = xRange || this._ATTACK_RANGE;
  yRange = yRange || player.getSprite().height;

  return (Math.abs(this._sprite.x - player.getSprite().x) <= xRange) && 
         (Math.abs(this._sprite.y - player.getSprite().y) <= yRange); 
}

Enemy.prototype.render = function() {
  // for some reason these are only true in render, not in update
  if (this._sprite !== null && this._sprite.body.blocked.left || this._sprite.body.blocked.right) {
    this.switchDirection();
  }
  //this._game.debug.bodyInfo(this._sprite, 100, 100);
}

Enemy.prototype.switchDirection = function() {
  this._direction = this._direction === 'left' ? 'right' : 'left';
  this._totalDist = 0;
}

var RangedEnemy = function(game) {
  this._ENEMY_HEALTH = 2;
  Entity.call(this, game, 'ranger', this._ENEMY_HEALTH, 5, 5, 500);
  this._ATTACK_RANGE = 32 * 10;
  this._STATES = {
    IDLE: 0,
    PATROL: 1,
    ATTACK: 2
  };
  this._WALK_SPEED = 100;
  this._state = this._STATES.IDLE;
  this._direction = 'left';
}

// Enemy inherits from Entity
RangedEnemy.prototype = Object.create(Entity.prototype);
RangedEnemy.prototype.constructor = RangedEnemy;

RangedEnemy.prototype.preLoad = function() {
  Entity.prototype.preLoad.call(this);
}

RangedEnemy.prototype.create = function(x, y, frame) {
  Entity.prototype.create.call(this, x, y, frame);
  this._sprite.body.immovable = true;
  this._sprite.body.setSize(33, 67, 33, 10);
  this._state = this._STATES.PATROL;
}

/**
 * Sets a collision with the ranged enemy and the player
 */
RangedEnemy.prototype.setCollisionWithPlayer = function(player) {
  var onCollision = function(player_sprite, enemy_sprite) {
     player.hurt();
  };
  this._game.physics.arcade.collide(player.getSprite(), this._sprite, onCollision);
}

RangedEnemy.prototype.update = function(player, layer) {
  Entity.prototype.update.call(this);
  switch (this._state) {
    case this._STATES.PATROL:
      this._patrol();
      break;

    case this._STATES.ATTACK:
      break;
  }

  if (this._sprite.body.blocked.left) {
    console.log('hi');
  }
  this._state = this.playerInRange(player) ? this._STATES.ATTACK : this._STATES.PATROL;
}

RangedEnemy.prototype._patrol = function() {
  this.move(this._direction);
  //if (this._sprite.body.velocity.x === 0) {
  if (this._sprite.body.blocked.left) {
    console.log('hi');
    Entity.prototype.switchDirection.call(this);
  }
}

RangedEnemy.prototype.playerInRange = function(player) {
  return this._game.physics.arcade.distanceBetween(player.getSprite(), this._sprite) <= this._ATTACK_RANGE;
}

RangedEnemy.prototype.render = function() {
  this._game.debug.bodyInfo(this._sprite, 100, 100);
}

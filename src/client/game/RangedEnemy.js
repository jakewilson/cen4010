var RangedEnemy = function(game) {
  this._ENEMY_HEALTH = 200;
  Entity.call(this, game, 'ranger', this._ENEMY_HEALTH, 5, 5);
}

// Enemy inherits from Entity
RangedEnemy.prototype = Object.create(Entity.prototype);
RangedEnemy.prototype.constructor = RangedEnemy;

RangedEnemy.prototype.create = function(x, y, frame) {
  Entity.prototype.create.call(this, x, y, frame);
  this._sprite.body.immovable = true;
  this._sprite.body.setSize(33, 67, 33, 10);
}

/**
 * Sets a collision with the ranged enemy and the player
 */
RangedEnemy.prototype.setCollisionWithPlayer = function(player) {
  var onCollision = function(player_sprite, enemy_sprite) {
    // TODO player.hurt()
  };
  this._game.physics.arcade.collide(player.getSprite(), this._sprite, onCollision);
}

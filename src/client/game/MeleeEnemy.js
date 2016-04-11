var MeleeEnemy = function(game) {
  this._ENEMY_HEALTH = 3;
  Entity.call(this, game, 'butcher', this._ENEMY_HEALTH, 5, 5, 500);
}

// Enemy inherits from Entity
MeleeEnemy.prototype = Object.create(Entity.prototype);
MeleeEnemy.prototype.constructor = MeleeEnemy;

MeleeEnemy.prototype.create = function(x, y, frame) {
  Entity.prototype.create.call(this, x, y, frame);
  this._sprite.body.immovable = true;
  //this._sprite.body.setSize(33, 67, 33, 10);
}

/**
 * Sets a collision with the ranged enemy and the player
 */
MeleeEnemy.prototype.setCollisionWithPlayer = function(player) {
  var onCollision = function(player_sprite, enemy_sprite) {
     player.hurt();
  };
  this._game.physics.arcade.collide(player.getSprite(), this._sprite, onCollision);
}

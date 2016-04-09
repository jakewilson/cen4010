var Enemy = function(game) {
  this._ENEMY_HEALTH = 200;
  Entity.call(this, game, this._ENEMY_HEALTH, 'ranger', 5, 5);
}

//Enemy inherits from Entity
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * Created the Enemy at the specified locations
 * @param x: the x location of the Enemy   
 * @param y: the y location of the Enemy
 * @param frame: starting frame of the Entity
 */
Enemy.prototype.create = function(x, y) {
  Entity.prototype.create.call(this, x, y, 'walkleft1.png');
}

Enemy.prototype.update = function() {


}

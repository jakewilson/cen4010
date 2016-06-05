var NUM_BULLETS = 10;

/**
 * Constructs a BulletPool
 *
 * @param game: the game object
 * @param name: the name of the bullet sprite
 */
var BulletPool = function(game, name, gravity, velocity) {
  this._game = game;
  this._gravity = gravity || false;

  this._pool = this._game.add.group();
  this._pool.enableBody = true;
  this._pool.physicsBodyType = Phaser.Physics.ARCADE;
  this._pool.createMultiple(NUM_BULLETS, name);

  // kill the bullet automatically once it goes out of bounds
  this._pool.setAll('outOfCameraBoundsKill', true);
  this._pool.setAll('outOfBoundsKill', true);
  this._pool.setAll('autoCull', true);
  this._pool.setAll('body.allowGravity', this._gravity);
  this._nextFire = 0;

  this._FIRE_RATE = 350;
  this._BULLET_VELOCITY = velocity || 400;
}

/**
 * Fires a bullet from the pool at the coordinates (x, y) in the specified direction
 * 
 * @param x: the x coordinate to fire the bullet at
 * @param y: the y coordinate to fire the bullet at
 * @param dir: the direction in which to fire the bullet
 */
BulletPool.prototype.fireBullet = function(x, y, dir) {
  // get the first non-existent bullet from the pool
  var bullet = this._pool.getFirstExists(false);

  // fire the bullet here
  if (bullet && this._game.time.now > this._nextFire) {
    this._nextFire = this._game.time.now + this._FIRE_RATE;
    bullet.reset(x, y);
    if (dir === 'right') {
      bullet.body.velocity.x = this._BULLET_VELOCITY;
    } else {
      bullet.body.velocity.x = this._BULLET_VELOCITY * (-1);
    }
    return true;
  }
  return false;
}

/**
 * Sets a collision with the pool and a tilemap layer
 * @param layer: the layer to set the collision with
 */
BulletPool.prototype.setCollisionWithLayer = function(layer) {
  var onCollision = function(bullet, layer) {
    bullet.kill();
  };
  this._game.physics.arcade.collide(layer, this._pool, onCollision);
}

/**
 * Sets a collision with the pool and an entity
 * @param entity: the entity to set the collision with
 */
BulletPool.prototype.setCollisionWithEntity = function(entity) {
  var onOverlap = function(sprite, bullet) {
    entity.hurt()
    bullet.kill();
  };
  this._game.physics.arcade.overlap(entity.getSprite(), this._pool, onOverlap);
}

/**
 * Sets the fire rate
 */
BulletPool.prototype.setFireRate = function(rate) {
  this._FIRE_RATE = rate;
}

BulletPool.prototype.kill = function() {
  if (this._pool) {
    this._pool.callAll('kill');
  }
}

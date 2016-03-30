var NUM_BULLETS = 10;
var BULLET_VELOCITY = 200;

/**
 * Constructs a BulletPool
 *
 * @param game: the game object
 * @param name: the name of the bullet sprite
 */
var BulletPool = function(game, name) {
  this._game = game;

  this._pool = this._game.add.group();
  this._pool.enableBody = true;
  this._pool.physicsBodyType = Phaser.Physics.ARCADE;
  this._pool.createMultiple(NUM_BULLETS, name);

  // kill the bullet automatically once it goes out of bounds
  this._pool.setAll('outOfCameraBoundsKill', true);
  this._pool.setAll('outOfBoundsKill', true);
  this._pool.setAll('autoCull', true);
  this._pool.setAll('body.allowGravity', false);
}

/**
 * Fires a bullet from the pool at the coordinates (x, y) in the specified direction
 * 
 * @param x: the x coordinate to fire the bullet at
 * @param y: the y coordinate to fire the bullet at
 * @param dir: the direction in which to fire the bullet (right now unused TODO)
 */
BulletPool.prototype.fireBullet = function(x, y, dir) {
  // TODO limit fire rate here
  // get the first non-existent bullet from the pool
  var bullet = this._pool.getFirstExists(false);

  // fire the bullet here
  if (bullet) {
    bullet.reset(x, y);
    bullet.body.velocity.x = BULLET_VELOCITY;
  }
}

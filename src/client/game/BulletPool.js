var NUM_BULLETS = 10;

var BulletPool = function(game, name, sprite) {
  this._game = game;
  this._sprite = sprite;

  this._pool = this._game.add.group();
  this._pool.enableBody = true;
  this._pool.physicsBodyType = Phaser.Physics.ARCADE;
  this._pool.createMultiple(NUM_BULLETS, name);

  // kill the bullet automatically once it goes out of bounds
  this._pool.setAll('outOfBoundsKill', true);
  this._pool.setAll('checkWorldBounds', true);
  this._pool.setAll('body.allowGravity', false);
}

BulletPool.prototype.fireBullet = function() {
  // TODO limit fire rate here
  // get the first non-existent bullet from the pool
  var bullet = this._pool.getFirstExists(false);

  // fire the bullet here
  if (bullet) {
    console.log('firing bullet');
    bullet.reset(this._sprite.x, this._sprite.y);
    bullet.body.velocity.x = 500;
  }
}

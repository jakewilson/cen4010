var Entity = function(game, name, health, walkSpeed, attackSpeed, damageRate) {
  this._game = game;
  this._name = name;
  this._health = health || 100;
  this._sprite = null;
  this._direction = 'right';
  this._WALK_FPS = walkSpeed || 5;
  this._ATTACK_FPS = attackSpeed || 5;
  this._currentPlayingAnim = null;
  this._attacking = false;
  this._bulletPool = null;
  this._damageRate = damageRate || 1500;
  this._nextDamage = 0;
  this._hurting = false;
}

/**
 * Loads the spritesheets
 */
Entity.prototype.preLoad = function() {
  this._game.load.atlasJSONHash(this._name, './assets/spritesheets/' + this._name + '.png', './assets/spritesheets/' + this._name + '.json');
}

/**
 * Kills the Entity
 */
Entity.prototype.kill = function() {
  this._sprite.kill();
}

/**
 * Plays the Entity's attack animation
 */
Entity.prototype.attack = function() {
  this._currentPlayingAnim = this._sprite.animations.play('attack' + this._direction, this._ATTACK_FPS);
  this._attacking = true;
}

/**
 * Adds the Entity to the game at the specified coordinates
 * on the specified frame
 * @param x: the x coordinate of the Entity
 * @param y: the y coordinate of the Entity
 * @param frame: starting frame of the Entity
 */
Entity.prototype.create = function(x, y, frame) {
  frame = frame || 'walkleft1.png';
  this._sprite = this._game.add.sprite(x, y, this._name, frame);
  this._game.physics.enable(this._sprite);
  this._sprite.body.collideWorldBounds = true;
}

/**
 * Adds an animation to the Entity
 * @param name: the name of the animation
 * @param frames: an array of spritesheet frames that comprise the animation
 * @param onComplete: callback function to call when the animation is complete
 */
Entity.prototype.addAnimation = function(name, frames, onComplete) {
  this._sprite.animations.add(name, frames).onComplete.add(onComplete, this);
}

/**
 * Creates the Bullet Pool for the Entity
 * @param game: the game object
 * @param path: the path to the bullet image
 */
Entity.prototype.createBulletPool = function(name) {
  this._bulletPool = new BulletPool(this._game, name, this._sprite);
}

Entity.prototype.setCollision = function(layer) {
  this._game.physics.arcade.collide(this._sprite, layer);
}

/**
 * Updates the Entity
 */
Entity.prototype.update = function() {
  if ((this._sprite.y + this._sprite.body.height) >= (this._game.height)) {
    this.kill();
  }

  if (this._hurting) {
    this._sprite.tint = 0xFF0000; // give the Entity a red tint to show taking damage
    if (this._game.time.now > this._nextDamage) {
      this._hurting = false;
      this._sprite.tint = 0xFFFFFF; // remove the tint
    }
  }
}

/**
 * Returns the sprite of the entity
 *
 * @return: the sprite of the entity
 */
Entity.prototype.getSprite = function() {
  return this._sprite;
}

Entity.prototype.setBulletPoolCollision = function(entity) {
  if (this._bulletPool)
    this._bulletPool.setCollisionWithEntity(entity);
}

Entity.prototype.setBulletPoolCollisionWithLayer = function(layer) {
  if (this._bulletPool)
    this._bulletPool.setCollisionWithLayer(layer);
}

/**
 * Deals 1 damage to an entity at their damageRate
 * @param amt: the amount to damage the player 
 * @return: the new health
 */
Entity.prototype.hurt = function() {
  if (this._game.time.now > this._nextDamage) {
    this._nextDamage = this._game.time.now + this._damageRate;
    this._health -= 1;
    this._hurting = true;
    // TODO play damage animation here
    if (this._health === 0) {
      this.kill();
    }
  }
}

Entity.prototype.isDead = function() {
  return !this._sprite.alive;
}

var Entity = function(game, name, health, walkSpeed, attackSpeed, damageRate) {
  this._game = game;
  this._name = name;
  this._health = health || 100;
  this._sprite = null;
  this._direction = 'right';
  this._WALK_FPS = walkSpeed || 5;
  this._ATTACK_FPS = attackSpeed || 5;
  this._WALK_SPEED = 250;
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
  if (this._bulletPool) {
    this._bulletPool.kill();
  }
}

/**
 * Plays the Entity's attack animation
 *
 * @param anim: the animation to play
 * @param speed: the speed at which to play the animation
 */
Entity.prototype.attack = function(anim, speed) {
  anim = anim || 'attack' + this._direction;
  speed = speed || this._ATTACK_FPS;
  if (!this._attacking) {
    this._currentPlayingAnim = this._sprite.animations.play(anim, speed);
  }
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

  this.addAnimation('walkright', ['walkright2.png', 'walkright3.png', 'walkright4.png'], this._animComplete);
  this.addAnimation('jumpright', ['jumpright1.png'], this._animComplete);
  this.addAnimation('attackright', ['attackright2.png', 'attackright3.png', 'attackright4.png'], this._animComplete)

  this.addAnimation('walkleft', ['walkleft2.png', 'walkleft3.png', 'walkleft4.png'], this._animComplete);
  this.addAnimation('jumpleft', ['jumpleft1.png'], this._animComplete);
  this.addAnimation('attackleft', ['attackleft2.png', 'attackleft3.png', 'attackleft4.png'], this._animComplete)
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
 * Called when any Animation completes. Sets the sprite frame
 * to the initial walking frame
 */
Entity.prototype._animComplete = function() {
  this._sprite.frameName = 'walk' + this._direction + '1.png';
  this._currentPlayingAnim = null;
  this._attacking = false;
}

/**
 * Creates the Bullet Pool for the Entity
 * @param game: the game object
 * @param path: the path to the bullet image
 * @param gravity: whether to allow gravity for bullets or not
 */
Entity.prototype.createBulletPool = function(name, gravity, velocity) {
  this._bulletPool = new BulletPool(this._game, name, gravity, velocity);
}

Entity.prototype.setCollision = function(layer, callback) {
  this._game.physics.arcade.collide(this._sprite, layer, callback);
}

/**
 * Updates the Entity
 */
Entity.prototype.update = function() {
  this._sprite.body.velocity.x = 0;
  if ((this._sprite.y + this._sprite.height) >= (this._game.height)) {
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

/**
 * Moves the Entity horizontally
 * @param direction: the direction to move the entity
 */
Entity.prototype.move = function(direction) {
  if (direction === 'right') {
    this._direction = 'right'; 
    this._sprite.body.velocity.x = this._WALK_SPEED;
  } else if (direction === 'left') {
    this._direction = 'left';
    this._sprite.body.velocity.x = -this._WALK_SPEED;
  }

  if (this._currentPlayingAnim === null || this._currentPlayingAnim.name.indexOf('walk') >= 0) {
    this._currentPlayingAnim = this._sprite.animations.play('walk' + this._direction, this._WALK_FPS);
  }
}

Entity.prototype.isDead = function() {
  return !this._sprite.alive;
}

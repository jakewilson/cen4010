/**
 * Constructs a TileSpriteGroup
 */
var TileSpriteGroup = function(game, name) {
  this._game = game;
  this._name = name;
  this._group = null;
  this._objects = null;
}

/**
 * Loads the sprite sheet
 */
TileSpriteGroup.prototype.preLoad = function() {
  this._game.load.atlasJSONHash(this._name, './assets/spritesheets/' + this._name + '.png', './assets/spritesheets/' + this._name + '.json');
}
/**
 * Creates a TileSpriteGroup
 *
 * @param spriteObjects: the objects for the sprites as specified in a Tiled object layer
 * @param startingFrameIdx: the starting frame index for the sprite
 * @param animName: the name to call the animation
 */
TileSpriteGroup.prototype.create = function(spriteObjects, startingFrameIdx, animName) {
  startingFrameIdx = startingFrameIdx || 1;
  animName = animName || 'anim';

  this._objects = spriteObjects;
  this._group = this._game.add.group();
  this._group.enableBody = true;
  this._group.physicsBodyType = Phaser.Physics.ARCADE;

  var this_ = this;
  this._objects.forEach(function(obj, idx) {
    var obj_ = this_._group.create(obj.x, obj.y, this_._name, startingFrameIdx, true);
    obj_.animations.add(animName);
  });

  this._group.setAll('body.allowGravity', false);
}

/**
 * Sets a collision between the player and the TileSpriteGroup
 *
 * @param player: the player
 * @param onOverlap: the function to call on an overlap
 */
TileSpriteGroup.prototype.setCollision = function(player, onOverlap) {
  this._game.physics.arcade.overlap(player.getSprite(), this._group, onOverlap, null, this);
}

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
 */
TileSpriteGroup.prototype.create = function(spriteObjects, startingFrameIdx) {
  if (startingFrameIdx === undefined)
    startingFrameIdx = 1;

  this._objects = spriteObjects;
  this._group = this._game.add.group();
  this._group.enableBody = true;
  this._group.physicsBodyType = Phaser.Physics.Arcade;

  var this_ = this;
  this._objects.forEach(function(obj, idx) {
    this_._group.create(obj.x, obj.y, this_._name, startingFrameIdx, true);
  });
}

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
 */
TileSpriteGroup.prototype.create = function(spriteObjects) {
  this._objects = spriteObjects;
  this._group = this._game.add.group();
  this._group.enableBody = true;
  this._group.physicsBodyType = Phaser.Physics.Arcade;

  var self = this;
  this._objects.forEach(function(obj, idx) {
    self._group.create(obj.x, obj.y, self._name, 1, true);
  });
}

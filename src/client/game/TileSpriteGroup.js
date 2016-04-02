var TileSpriteGroup = function(game, name) {
  this._game = game;
  this._name = name;
  this._group = null;
}

/**
 * Loads the sprite sheet
 */
TileSpriteGroup.prototype.preLoad = function() {
  this._game.load.atlasJSONHash(this._name, './assets/spritesheets/' + this._name + '.png', './assets/spritesheets/' + this._name + '.json');
}

TileSpriteGroup.prototype.create = function() {
  this._group = this._game.add.group();
  this._group.enableBody = true;
  this._group.physicsBodyType = Phaser.Physics.Arcade;

  // TODO create objects
  // this._group.create(60, 60, this._name, 1);
}

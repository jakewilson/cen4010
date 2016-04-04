var Tofu = function(game) {
  TileSpriteGroup.call(this, game, 'tofu');
}

/** Tofu inherits from TileSpriteGroup */
Tofu.prototype = Object.create(TileSpriteGroup.prototype);
Tofu.prototype.constructor = Tofu;

Tofu.prototype.preLoad = function() {
  TileSpriteGroup.prototype.preLoad.call(this);
}

Tofu.prototype.create = function(spriteObjects) {
  TileSpriteGroup.prototype.create.call(this, spriteObjects);
}

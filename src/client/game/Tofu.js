var Tofu = function(game) {
  TileSpriteGroup.call(this, game, 'tofu');
}

/** Tofu inherits TileSpriteGroup */
Tofu.prototype = Object.create(TileSpriteGroup.prototype);
Tofu.prototype.constructor = Tofu;

Tofu.prototype._onOverlap = function(obj1, obj2) {
  // TODO increase player health here
  console.log('health++');
}

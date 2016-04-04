var Animal = function(game) {
  TileSpriteGroup.call(this, game, 'animal');
}

/** Animal inherits from TileSpriteGroup */
Animal.prototype = Object.create(TileSpriteGroup.prototype);
Animal.prototype.constructor = Animal;

Animal.prototype.preLoad = function() {
  TileSpriteGroup.prototype.preLoad.call(this);
}

Animal.prototype.create = function(spriteObjects) {
  TileSpriteGroup.prototype.create.call(this, spriteObjects);
}

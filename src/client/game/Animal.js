var Animal = function(game) {
  TileSpriteGroup.call(this, game, 'animal');
}

/** Animal inherits TileSpriteGroup */
Animal.prototype = Object.create(TileSpriteGroup.prototype);
Animal.prototype.constructor = Animal;

Animal.prototype._onOverlap = function(player, group) {
  console.log('it finally worked!');
}

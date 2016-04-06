var Animal = function(game) {
  TileSpriteGroup.call(this, game, 'animal');
  this._scoreAmt = 100;
}

/** Animal inherits TileSpriteGroup */
Animal.prototype = Object.create(TileSpriteGroup.prototype);
Animal.prototype.constructor = Animal;

Animal.prototype._onOverlap = function(player, animal) {
  // play the animation and kill the sprite on completion
  animal.animations.play('anim', 3, false, true);
}

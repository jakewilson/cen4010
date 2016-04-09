var Animal = function(game) {
  TileSpriteGroup.call(this, game, 'animal');
  this._released = false;
}

/** Animal inherits TileSpriteGroup */
Animal.prototype = Object.create(TileSpriteGroup.prototype);
Animal.prototype.constructor = Animal;

Animal.prototype.setCollision = function(player) {
  var onOverlap = function(player_sprite, animal) {
    if (!animal.released) {
      animal.released = true;
      // play the animation and kill the sprite on completion
      animal.animations.play('anim', 3, false, true);
      player.registerAnimalRescued();
    }
  };
  TileSpriteGroup.prototype.setCollision.call(this, player, onOverlap);
}

var Carrot = function(game) {
  TileSpriteGroup.call(this, game, 'carrot');
}

/** Carrot inherits TileSpriteGroup */
Carrot.prototype = Object.create(TileSpriteGroup.prototype);
Carrot.prototype.constructor = Carrot;

Carrot.prototype.create = function(spriteObjects, startingFrameIdx) {
  TileSpriteGroup.prototype.create.call(this, spriteObjects, startingFrameIdx, 'anim');

  this._group.children.forEach(function(child) {
    child.animations.play('anim', 5, true);
  });
}

Carrot.prototype.setCollision = function(player) {
  var onOverlap = function(player_sprite, carrot) {
    carrot.kill();
    player.registerCarrotCollected();
  }

  TileSpriteGroup.prototype.setCollision.call(this, player, onOverlap);
}

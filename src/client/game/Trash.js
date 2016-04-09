var Trash = function(game) {
  TileSpriteGroup.call(this, game, 'trash');
}

/** Animal inherits TileSpriteGroup */
Trash.prototype = Object.create(TileSpriteGroup.prototype);
Trash.prototype.constructor = Trash;

Trash.prototype.create = function(spriteObjects, startingFrameIdx) {
  TileSpriteGroup.prototype.create.call(this, spriteObjects, startingFrameIdx, 'anim');

  this._group.children.forEach(function(child) {
    child.animations.play('anim', 5, true);
  });
}

Trash.prototype.setCollision = function(player) {
  var onOverlap = function(player_sprite, Trash) {
    // TODO
  };
  TileSpriteGroup.prototype.setCollision.call(this, player, onOverlap);
}

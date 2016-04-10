var Tofu = function(game) {
  TileSpriteGroup.call(this, game, 'tofu');
}

/** Tofu inherits TileSpriteGroup */
Tofu.prototype = Object.create(TileSpriteGroup.prototype);
Tofu.prototype.constructor = Tofu;

Tofu.prototype.create = function(spriteObjects, startingFrameIdx) {
  TileSpriteGroup.prototype.create.call(this, spriteObjects, startingFrameIdx, 'anim');

  this._group.children.forEach(function(child) {
    child.animations.play('anim', 5, true);
  });
}

Tofu.prototype.setCollision = function(player) {
  var onOverlap = function(player_sprite, tofu) {
    tofu.kill();
    player.heal(1);
  }

  TileSpriteGroup.prototype.setCollision.call(this, player, onOverlap);
}

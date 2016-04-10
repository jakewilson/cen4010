var Trash = function(game) {
  TileSpriteGroup.call(this, game, 'trash');
  this._timeDamaged = 0; 
}

/** Animal inherits TileSpriteGroup */
Trash.prototype = Object.create(TileSpriteGroup.prototype);
Trash.prototype.constructor = Trash;

Trash.prototype.create = function(spriteObjects, startingFrameIdx) {
  TileSpriteGroup.prototype.create.call(this, spriteObjects, startingFrameIdx, 'anim');
  this._group.setAll('body.immovable', true);

  this._group.children.forEach(function(child) {
    child.animations.play('anim', 5, true);
    child.body.setSize(20, 21, 6, 43);
  });
}

Trash.prototype.setCollision = function(player) {
  var onCollide = function(player_sprite, trash) {
    if(this._timeDamaged === 0) {
      this.timeDamaged = (this._game.time.now /1000);
    }
    if((this._game.time.now / 1000) - (this._timeDamaged) > 1.5) {
      this._timeDamaged = (this._game.time.now / 1000);
      player.updateHealth(-1);
    }
  };
   this._game.physics.arcade.collide(player.getSprite(), this._group, onCollide, null, this);
}

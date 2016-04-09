var World = function(game) {
  this._game = game;
  this._map = null;
  this.layers = [];
  // TODO create instance of Enemy objects when we have it
  this.enemies = [];
  this.tofu = new Tofu(game);
  this.animal = new Animal(game);
  this.carrot = new Carrot(game);
}

World.prototype.preLoad = function() {
  this._game.load.tilemap('map', './assets/tilemap/map.json', null, Phaser.Tilemap.TILED_JSON);
  this._game.load.image('background', './assets/tilemap/background.png');

  this.tofu.preLoad();
  this.carrot.preLoad();
  this.animal.preLoad();
  this._game.load.image('carrots', './assets/tiles/carrotsheet.png');
  this._game.load.image('tiles', './assets/tiles/tilesheet.png');
  this._game.load.image('trash', './assets/tiles/trash.png');
}

World.prototype.create = function() {
  this._map = game.add.tilemap('map');
  this.createLayers();

  this.tofu.create(this.layers['Tofu']);
  this.animal.create(this.layers['Animals'], 3);
  this.carrot.create(this.layers['Carrots'], 3);

  this._map.addTilesetImage('Tilesheet', 'tiles');
  this._map.addTilesetImage('trash1', 'trash');
  this._map.addTilesetImage('carrotsheet', 'carrots');

  this.setCollisionTiles();
  this.layers['First'].resizeWorld();

  // this.createEnemies();
}

World.prototype.setCollisionTiles = function() {
  this._map.setCollisionBetween(18, 21);
  this._map.setCollisionBetween(23, 25);
  this._map.setCollisionBetween(34, 35);
  this._map.setCollisionBetween(39, 41);
  this._map.setCollisionBetween(50, 51);
  this._map.setCollisionBetween(65, 69);
}

World.prototype.createLayers = function() {
  this.layers['First'] = this._map.createLayer('First');
  this.layers['Enemies'] = this._map.objects['Enemies'];
  this.layers['Tofu'] = this._map.objects['Tofu'];
  this.layers['Animals'] = this._map.objects['Animals'];
  this.layers['Carrots'] = this._map.objects['Carrots'];
}

/**
 * Sets collisions between the player and all sprite groups (animal, tofu, carrot)
 *
 * @param player: the player
 */
World.prototype.setCollision = function(player) {
  this.tofu.setCollision(player);
  this.carrot.setCollision(player);
  this.animal.setCollision(player);
}

World.prototype.createEnemies = function() {
  // enemy object layer
  // TODO
  var self = this;
  this.layers['Enemies'].forEach(function(enemy) {
    self.enemies.push(enemy);
    if (enemy.name === 'Range') {
      rangeSprite = self._game.add.sprite(enemy.x, enemy.y, 'range', 'walk1.png');
    }
  });
}

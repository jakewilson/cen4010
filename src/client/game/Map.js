var Map = function(game) {
  this._game = game;
  this._map = null;
  this.layers = [];

  this._rangedEnemies = [];
  this._meleeEnemies = [];

  this.tofu = new Tofu(game);
  this.animal = new Animal(game);
  this.carrot = new Carrot(game);
  this.trash = new Trash(game);
}

Map.prototype.preLoad = function() {
  this._game.load.tilemap('map', './assets/tilemap/map.json', null, Phaser.Tilemap.TILED_JSON);
  this._game.load.image('background', './assets/tilemap/background.png');

  this.tofu.preLoad();
  this.carrot.preLoad();
  this.animal.preLoad();
  this.trash.preLoad();

  this._game.load.atlasJSONHash('ranger', './assets/spritesheets/ranger.png', './assets/spritesheets/ranger.json');
  this._game.load.image('meat', './assets/spritesheets/banana.png');

  this._game.load.atlasJSONHash('butcher', './assets/spritesheets/butcher.png', './assets/spritesheets/butcher.json');

  this._game.load.image('tiles', './assets/tiles/tilesheet.png');
}

Map.prototype.create = function() {
  this._map = game.add.tilemap('map');
  this.createLayers();

  this.tofu.create(this.layers['Tofu']);
  this.animal.create(this.layers['Animals'], 3);
  this.carrot.create(this.layers['Carrots'], 3);
  this.trash.create(this.layers['Trash'], 3);

  this._map.addTilesetImage('Tilesheet', 'tiles');
  this._map.addTilesetImage('carrotsheet', 'carrots');

  this.setCollisionTiles();
  this.layers['First'].resizeWorld();

  this.createEnemies();
}

Map.prototype.setCollisionTiles = function() {
  this._map.setCollisionBetween(18, 21);
  this._map.setCollisionBetween(23, 25);
  this._map.setCollisionBetween(34, 35);
  this._map.setCollisionBetween(39, 41);
  this._map.setCollisionBetween(50, 51);
  this._map.setCollisionBetween(65, 69);
}

Map.prototype.createLayers = function() {
  this.layers['First'] = this._map.createLayer('First');

  // object layers
  this.layers['Enemies'] = this._map.objects['Enemies'];
  this.layers['Tofu'] = this._map.objects['Tofu'];
  this.layers['Animals'] = this._map.objects['Animals'];
  this.layers['Carrots'] = this._map.objects['Carrots'];
  this.layers['Trash'] = this._map.objects['Trash'];
}

/**
 * Updates the map
 *
 * @param player: the player
 */
Map.prototype.update = function(player) {
  this._setEnemyCollisions(this._rangedEnemies, player);
  this._setEnemyCollisions(this._meleeEnemies, player);
  // set collisions with game objects (tofu, animals, carrots, trash cans)
  this.setCollision(player);
}

Map.prototype._setEnemyCollisions = function(enemies, player) {
  var this_ = this;
  enemies.forEach(function(enemy) {
    enemy.setCollision(this_.layers['First']);
    enemy.setCollisionWithPlayer(player);
    player.setBulletPoolCollision(enemy);
  });
}

/**
 * Sets collisions between the player and all sprite groups (animal, tofu, carrot)
 *
 * @param player: the player
 */
Map.prototype.setCollision = function(player) {
  this.tofu.setCollision(player);
  this.carrot.setCollision(player);
  this.animal.setCollision(player);
  this.trash.setCollision(player);
}

Map.prototype.createEnemies = function() {
  this._createRangedEnemies();
  this._createMeleeEnemies();
}

Map.prototype._createRangedEnemies = function() {
  var this_ = this;
  this.layers['Enemies'].forEach(function(enemy) {
    if (enemy.name === 'Range') {
      var ranger = new RangedEnemy(this_._game);
      ranger.create(enemy.x, enemy.y);
      this_._rangedEnemies.push(ranger);
    }
  });
}

Map.prototype._createMeleeEnemies = function() {
  var this_ = this;
  this.layers['Enemies'].forEach(function(enemy) {
    if (enemy.name === 'Melee') {
      var butcher = new MeleeEnemy(this_._game);
      butcher.create(enemy.x, enemy.y);
      this_._meleeEnemies.push(butcher);
    }
  });
}

var Map = function(game) {
  this._game = game;
  this._map = null;
  this.layers = [];
}

Map.prototype.load = function() {
  this._game.load.tilemap('map', './assets/tilemap/map.json', null, Phaser.Tilemap.TILED_JSON);
  this._game.load.image('background', './assets/tilemap/background.png');
  this._game.load.image('carrots', './assets/tiles/carrotsheet.png');
  this._game.load.image('tofu', './assets/tiles/tofusheet.png');
  this._game.load.image('tiles', './assets/tiles/tilesheet.png');
  this._game.load.image('trash', './assets/tiles/trash.png');
  this._game.load.image('oink', './assets/tiles/pigsheet.png');
  //game.load.image('inverted', './assets/tiles/inverted_tilesheet.png');
}

Map.prototype.create = function() {
  this._map = game.add.tilemap('map');
  this._map.addTilesetImage('Tilesheet', 'tiles');
  this._map.addTilesetImage('trash1', 'trash');
  this._map.addTilesetImage('carrotsheet', 'carrots');
  this._map.addTilesetImage('tofusheet', 'tofu');
  this._map.addTilesetImage('pig', 'oink');
  this._map.addTilesetImage('invertedtilesheet', 'inverted');

  this.setCollisionTiles();
  this.createLayers();
  this.layers['First'].resizeWorld();
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
}

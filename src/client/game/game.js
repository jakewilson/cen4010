var width = 900, height = 21 * 32;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'meatpocalypse', { preload: preload, create: create, update: update});

function preload() {
  loadMap();
  loadAnimations();
}
var map, layer, player;

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  bg = game.add.tileSprite(0, 0, width, height, 'background');
  bg.fixedToCamera = true;

  map = game.add.tilemap('map');
  map.addTilesetImage('Tilesheet', 'tiles');
  map.addTilesetImage('trash1', 'trash');
  map.addTilesetImage('carrotsheet', 'carrots');
  map.addTilesetImage('tofusheet', 'tofu');
  map.addTilesetImage('pig', 'oink');
  map.addTilesetImage('invertedtilesheet', 'inverted');

  map.setCollisionBetween(18, 21);
  map.setCollisionBetween(23, 25);
  map.setCollisionBetween(34, 35);
  map.setCollisionBetween(39, 41);
  map.setCollisionBetween(50, 51);
  map.setCollisionBetween(65, 69);
  

  layer = map.createLayer('Tile Layer 1');
  layer.resizeWorld();

  player = new Player(game);
  player.create(0, 32 * 15);

  game.physics.arcade.gravity.y = 500;
}

function update() {
  player.setCollision(layer);
}


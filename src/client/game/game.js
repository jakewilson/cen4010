var game = new Phaser.Game(800, 16 * 30, Phaser.AUTO, 'meatpocalypse', { preload: preload, create: create, update: update});

function preload() {
  loadMap();
  loadAnimations();
}
var map, cursors, layer, frameSpeed, playerSpeed;

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  map = game.add.tilemap('map');
  map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');

  map.setCollisionBetween(14, 16);
  map.setCollisionBetween(20, 25);
  map.setCollisionBetween(27, 29);
  map.setCollision(40);

  layer = map.createLayer('World1');
  layer.resizeWorld();

  var player = new Player(game);
  player.create(0, 16 * 9);
}

function update() {
}


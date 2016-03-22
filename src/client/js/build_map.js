var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
  game.load.tilemap('map', './js/assets/tilemap/test_map.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles', './js/assets/tiles/basictiles.png');
  game.load.image('protagonist', './js/assets/sprites/protagonist/walk1.png');
}

var map, cursors, layer, player;

function create() {
  map = game.add.tilemap('map');
  map.addTilesetImage('basictiles', 'tiles');

  layer = map.createLayer('Bottom Layer');
  layer.resizeWorld();

  player = game.add.sprite(200, 200, 'protagonist');
  game.physics.enable(player);

  cursors = game.input.keyboard.createCursorKeys();
}

function update() {

}

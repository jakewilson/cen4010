var game = new Phaser.Game(800, 16 * 15, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
  game.load.tilemap('map', './assets/tilemap/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles', './assets/tiles/super_mario.png');
  game.load.atlasJSONHash('protagonist-walk', './assets/sprites/protagonist/walk.png', './assets/sprites/protagonist/walk.json');
}

var map, cursors, layer, player, frameSpeed;

function create() {
  map = game.add.tilemap('map');
  map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');

  layer = map.createLayer('World1');
  layer.resizeWorld();

  map.setCollisionBetween(14, 16, true, layer);

  player = game.add.sprite(0, 16 * 9, 'protagonist-walk');
  player.animations.add('walk');

  frameSpeed = 5;
  playerSpeed = 4;

  game.physics.enable(player);

  game.camera.follow(player);

  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  game.physics.arcade.collide(player, layer);

  if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    player.play('walk', frameSpeed);
    player.x += 4;
  }
  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    player.play('walk', frameSpeed);
    player.x -= 4;
  }
  if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    player.play('walk', frameSpeed);
    player.y -= 4;
  }
  if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    player.play('walk', frameSpeed);
    player.y += 4;
  }
}

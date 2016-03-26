var game = new Phaser.Game(800, 16 * 15, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
  game.load.tilemap('map', './assets/tilemap/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles', './assets/tiles/super_mario.png');

  game.load.atlasJSONHash('protagonist', './assets/spritesheets/protagonist.png', './assets/spritesheets/protagonist.json');
}

var map, cursors, layer, player, frameSpeed, playerSpeed;

function create() {
  map = game.add.tilemap('map');
  map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');

  layer = map.createLayer('World1');
  layer.resizeWorld();

  map.setCollisionBetween(14, 16, true, layer);

  player = game.add.sprite(0, 16 * 9, 'protagonist');
  player.frameName = 'walk1.png';

  player.animations.add('walk', ['walk2.png', 'walk3.png', 'walk4.png', 'walk1.png']); // TODO change walk animation to be only one step at a time
  player.animations.add('attack', ['walk1.png', 'attack2.png', 'attack3.png', 'attack4.png']); // TODO change walk animation to be only one step at a time

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
    player.play('jump', frameSpeed);
    player.y -= 4;
  }
  if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    player.play('jump', frameSpeed);
    player.y += 4;
  }
  if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
    player.play('attack', frameSpeed);
  }

}

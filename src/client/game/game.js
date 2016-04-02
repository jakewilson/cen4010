var width = 900, height = (21 * 32) - 8;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'meatpocalypse', { preload: preload, create: create, update: update});

var map, layer, player;

function preload() {
  loadAnimations();
  map = new Map(game);
  map.preLoad();
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  bg = game.add.tileSprite(0, 0, width, height, 'background');
  bg.fixedToCamera = true;

  map.create();
//  var carrotLayer = map.objects['Carrot'];
//  var carrotSprite = [];
//
//  carrotLayer.forEach(function(carrot, index) {
//    carrotSprite[index] = game.add.tileSprite(carrot.x, carrot.y, 32, 32, 'carrots');
//  });

  player = new Player(game);
  player.create(0, 32 * 15);

  game.physics.arcade.gravity.y = 500;
}

function update() {
  player.setCollision(map.layers['First']);
  player.update();
}


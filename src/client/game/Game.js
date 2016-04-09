var width = 900, height = (21 * 32) - 8;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'meatpocalypse', { preload: preload, create: create, update: update});

var map, layer, player, timerText;

function preload() {
  map = new Map(game);
  map.preLoad();
  player = new Player(game);
  player.preLoad();
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  bg = game.add.tileSprite(0, 0, width, height, 'background');
  bg.fixedToCamera = true;

  map.create();

  var textStyle = { font: "18px Arial", fill: "#ffffff", align: "left"};
  timerText = game.add.text(800, 18, 'Time: ', textStyle);
  timerText.fixedToCamera = true;
  pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
  pauseKey.onDown.add(pauseFunction, this);

  player.create(0, 32 * 15);
  game.physics.arcade.gravity.y = 500;
}

function update() {
  player.setCollision(map.layers['First']);

  // set collisions with game objects (tofu, animals, carrots, trash cans)
  map.setCollision(player);

  player.update();
  map.update();

  timerText.text = 'Time: ' + (Math.round(game.time.now) / 1000).toFixed(1);
}

function pauseFunction() {
  game.paused = !game.paused;
}

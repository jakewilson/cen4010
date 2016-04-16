var width = 900, height = (21 * 32) - 8;
var elapsedTime,
  pauseTime = 0,
  tmpPauseTime = 0;

var game = new Phaser.Game(width, height, Phaser.AUTO, 'meatpocalypse');
var map, layer, player, timerText;

var loadState = {
  preload: function() {
  },
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.state.start('play');
  }
};

var playState = {
  preload: function() {
    map = new World(game);
    map.preLoad();
    player = new Player(game);
    player.preLoad();
  },

  create: function() {
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
  },

  update: function() {
    player.setCollision(map.layers['First']);
  
  
    player.update();
    map.update(player);
  
    elapsedTime = ((Math.round(game.time.now) - pauseTime) / 1000).toFixed(1);
    timerText.text = 'Time: ' + elapsedTime;
  }
};

function pauseFunction() {
  game.paused = !game.paused;
  if(game.paused) {
    tmpPauseTime = game.time.now;
  } else {
    pauseTime += (game.time.now - tmpPauseTime);
  }
}

game.state.add('load', loadState, true);
game.state.add('play', playState);


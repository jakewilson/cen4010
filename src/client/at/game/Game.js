var width = 900, height = (21 * 32) - 8;
var elapsedTime,
  pauseTime = 0,
  tmpPauseTime = 0;

var game = new Phaser.Game(width, height, Phaser.AUTO, 'meatpocalypse');
var map, layer, player, timerText;

var loadState = {
  preload: function() {
    game.load.atlasJSONHash('highScore', '../images/mainMenuInverted.png', '../images/mainMenuInverted.json');	
    game.load.atlasJSONHash('quit', '../images/mainMenuInverted.png', '../images/mainMenuInverted.json');	
    game.load.atlasJSONHash('play', '../images/mainMenuInverted.png', '../images/mainMenuInverted.json');	
    game.load.atlasJSONHash('yesNo', '../images/yesNoButtons.png', '../images/yesNoButtons.json');	
    game.load.image('background', '../images/mainMenu.png');	
    game.load.image('death', '../images/gameOver.png');	
    game.load.image('name', '../images/Meatpocalypse.png');	
  },
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.state.start('mainMenu');
  }
};

var first = true;

var mainMenu = {
  create: function() {
    image = game.add.image(0, 0, 'background');
    quit = game.add.button(675, 150, 'quit', quitClick, this, 'RQuit.png', 'WQuit.png', 'RQuit.png');
    play_button = game.add.button(50, 160, 'play', playClick, this, 'RPlayButton.png', 'WPlay.png', 'RPlayButton.png');
    highScore_button = game.add.button(250, 395, 'highScore', hsClick, this, 'WRHS.png', 'RWHS.png', 'WRHS.png');

    function playClick() {
      game.state.start('play');
    }
		
    function hsClick() {
      window.location = "/highScore.html";
    }
		
    function quitClick() {
      window.location = "/index.html";
    }
  }
};

var deathScreen = {
  create: function() {
    game.add.tileSprite(0, 0, 1024, 1024, 'background');
    death = game.add.sprite(275, 50, 'death');
    death.scale.set(0.5, 0.5);
    yes_button = game.add.button(50, 160, 'yesNo', yesClick, this, 'Ryes.png', 'Wyes.png', 'Ryes.png');
    no_button = game.add.button(675, 160, 'yesNo', noClick, this, 'Rno.png', 'Wno.png', 'Rno.png');
    death = game.add.sprite(190, 580, 'name');
    death.scale.set(1, 1);

    function yesClick() {
      //Write to the database here
      game.state.start('play');
    }
		
    function noClick() {
      //Write to the database here
      game.state.start('load');
    }
  }
};

var victoryScreen = {
  create: function() {
    game.add.image(game.world.centerX, game.world.centerY, 'death').anchor.set(0.5);
    quit = game.add.button(675, 150, 'quit', quitClick, this, 'RQuit.png', 'WQuit.png', 'RQuit.png');
    play_button = game.add.button(50, 160, 'play', actionOnClick, this, 'RPlayButton.png', 'WPlay.png', 'RPlayButton.png');
    highScore_button = game.add.button(250, 395, 'highScore', hsClick, this, 'WRHS.png', 'RWHS.png', 'WRHS.png');

    function actionOnClick() {
      game.state.start('play');
    }
		
    function hsClick() {
      window.location = "/highScore.html";
    }
		
    function quitClick() {
      window.location = "/index.html";
    }
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
  },

  render: function() {
    map.render();
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
game.state.add('mainMenu', mainMenu);
game.state.add('play', playState);
game.state.add('deathScreen', deathScreen);
game.state.add('victoryScreen', victoryScreen);

var width = 900, height = (21 * 32) - 8;
var elapsedTime,
  startTime,
  victory = 0,
  pauseTime = 0,
  tmpPauseTime = 0
  playAgain = false;

var game = new Phaser.Game(width, height, Phaser.AUTO, 'meatpocalypse');
var map, layer, player, timerText, victoryTimeText;

var loadState = {
  preload: function() {
    game.load.atlasJSONHash('highScore', './assets/images/mainMenuInverted.png', './assets/images/mainMenuInverted.json');	
    game.load.atlasJSONHash('quit', './assets/images/mainMenuInverted.png', './assets/images/mainMenuInverted.json');	
    game.load.atlasJSONHash('play', './assets/images/mainMenuInverted.png', './assets/images/mainMenuInverted.json');	
    game.load.atlasJSONHash('yesNo', './assets/images/yesNoButtons.png', './assets/images/yesNoButtons.json');	
    game.load.atlasJSONHash('MainMenu', './assets/images/menuButtons.png', './assets/images/menuButtons.json');	
    game.load.image('background', './assets/images/MainMenu.png');	
    game.load.image('death', './assets/images/gameOver.png');	
    game.load.image('name', './assets/images/Meatpocalypse.png');	
    game.load.image('instructions', './assets/images/instructions.png');	
    game.load.image('victory', './assets/images/victory.png');	
  },
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.state.start('mainMenu');
  }
};


var mainMenu = {
  create: function() {
    image = game.add.image(0, 0, 'background');
    console.log(image);
    quit = game.add.button(675, 150, 'quit', quitClick, this, 'RQuit.png', 'WQuit.png', 'RQuit.png');
    play_button = game.add.button(50, 160, 'play', playClick, this, 'RPlayButton.png', 'WPlay.png', 'RPlayButton.png');
    highScore_button = game.add.button(250, 395, 'highScore', hsClick, this, 'WRHS.png', 'RWHS.png', 'WRHS.png');
    instruction_button = game.add.button(650, 500, 'MainMenu', instructClick, this, 'instructionsR.png', 'instructionsW.png', 'instructionsR.png');

    function playClick() {
      game.state.start('play');
    }

    function instructClick() {
      game.state.start('instructionScreen');
    }
		
    function hsClick() {
      window.location = "/at/highScore.html";
    }
		
    function quitClick() {
      window.location = "/at/index.html";
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
      playAgain = true;
      game.state.start('sendStats');
    }
		
    function noClick() {
      playAgain = false;
      game.state.start('sendStats');
    }
  }
};

var instructionScreen = {
  create: function() {
    game.add.image(game.world.centerX, game.world.centerY, 'instructions').anchor.set(0.5);
    menu_button = game.add.button(750, 600, 'MainMenu', menuClick, this, 'mainMenuR.png', 'mainMenuW.png', 'mainMenuR.png');

    function menuClick() {
      game.state.start('mainMenu');
    }
   }
} 

var victoryScreen = {
  create: function() {
    image = game.add.image(0, 0, 'victory');
    game.add.button(30, 155, 'MainMenu', play, this, 'playAgainWR.png', 'playAgainRW.png', 'playAgainWR.png');
    game.add.button(675, 165, 'MainMenu', mainMenu, this, 'mainMenuWR.png', 'mainMenuRW.png', 'mainMenuWR.png');
    victoryTimeText = game.add.text(400, 13 * 32, 'Time: ', { font: "18px Arial", fill: "#ffffff", align: "left"});
    victoryTimeText.text = 'Time: ' + elapsedTime;
    victory = 1;

    function mainMenu() {
      playAgain = false;
      game.state.start('sendStats');
    }

    function play() {
      playAgain = true;
      game.state.start('sendStats');
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
    initTime();
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
    elapsedTime = ((Math.round((+new Date()) - startTime) - pauseTime) / 1000).toFixed(1);
    timerText.text = 'Time: ' + elapsedTime;
  },

  render: function() {
    map.render();
  }
};

var sendStats = {
  create: function() {
    var xhr = new XMLHttpRequest();
    var stats = player.getStats();
    stats.victory = victory;
    if (stats.victory) {
      stats.score += 500;
    }
    $.post('/registerStatistics', stats);
    if (playAgain) {
      game.state.start('play');
    } else {
      location.reload();
    }
  }
}

function pauseFunction() {
  game.paused = !game.paused;
  if(game.paused) {
    tmpPauseTime = (+ new Date() - startTime);
  } else {
    pauseTime += ((+ new Date() - startTime) - tmpPauseTime);
  }
}

function initTime() {
  pauseTime = 0;
  startTime = (+ new Date());
}

game.state.add('load', loadState, true);
game.state.add('mainMenu', mainMenu);
game.state.add('play', playState);
game.state.add('deathScreen', deathScreen);
game.state.add('victoryScreen', victoryScreen);
game.state.add('sendStats', sendStats);
game.state.add('instructionScreen', instructionScreen);
game.state.add('victoryScreen', victoryScreen);

game.getElapsedTime = function() {
  return elapsedTime;
}

function loadMap() {
  game.load.tilemap('map', './assets/tilemap/map.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('background', './assets/tilemap/background.png');
  game.load.image('carrots', './assets/tiles/carrotsheet.png');
  game.load.image('tofu', './assets/tiles/tofusheet.png');
  game.load.image('tiles', './assets/tiles/tilesheet.png');
  game.load.image('trash', './assets/tiles/trash.png');
  game.load.image('oink', './assets/tiles/pigsheet.png');
  //game.load.image('inverted', './assets/tiles/inverted_tilesheet.png');

}

function createMap() {

}

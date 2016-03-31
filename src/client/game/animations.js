function loadAnimations() {
  game.load.atlasJSONHash('protagonist', './assets/spritesheets/protagonist.png', './assets/spritesheets/protagonist.json');
  game.load.atlasJSONHash('ranged', './assets/spritesheets/ranged.png', './assets/spritesheets/ranged.json');
  // TODO once we get carrot sprite sheet
  //game.load.atlasJSONHash('carrots', './assets/spritesheets/carrots.png', './assets/spritesheets/carrots.json');

  game.load.image('banana', './assets/spritesheets/banana.png');
}

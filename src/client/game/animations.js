function loadAnimations() {
  game.load.atlasJSONHash('protagonist', './assets/spritesheets/protagonist.png', './assets/spritesheets/protagonist.json');
  game.load.atlasJSONHash('range', './assets/spritesheets/ranged.png', './assets/spritesheets/ranged.json');
  game.load.atlasJSONHash('boss', './assets/spritesheets/boss.png', './assets/spritesheets/boss.json');
  // TODO once we get carrot sprite sheet
  //game.load.atlasJSONHash('carrots', './assets/spritesheets/carrots.png', './assets/spritesheets/carrots.json');

  game.load.image('banana', './assets/spritesheets/banana.png');
}

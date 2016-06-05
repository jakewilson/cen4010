var Boss = function(game) {
  this._ENEMY_HEALTH = 10;
  Enemy.call(this, game, 'boss', this._ENEMY_HEALTH, 32, 150);
  this._WALK_SPEED = 200;
  this._STATES.CHARGE = 3;
  this._healthPool = null;
  this._healthOneY = 90;
  this._healthTwoY = this._healthOneY + 20;
  this._healthX = 10300;
  this._drumstickTextOffset = 18;
  this.inCinematic = false;
  this._cinText = "";
}


var cinematicText = [
  "It's Good to see you again Gene Gregor, You look as skinny as ever",
  "I see that you've become the leader of the puny vegan resistance.",
  "I, Salem Guido will personally see to the destruction of you and",
  "your vegatable loving friends. MEAT RULES THE WORLD!!!!"
];

var nameText;
var line = [];

var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 120;
var lineDelay = 400; 
// Boss inherits from Enemy
Boss.prototype = Object.create(Enemy.prototype);
Boss.prototype.constructor = Boss;

Boss.prototype.preLoad = function() {
  Entity.prototype.preLoad.call(this);
  this._game.load.image('drumstick', './assets/spritesheets/drumstick.png');
}

Boss.prototype.kill = function() {
  Enemy.prototype.kill.call(this);
  // TODO switch to `victory` state here
  this._game.state.start('victoryScreen');
}

Boss.prototype.update = function(player) {
  if (!Enemy.prototype.update.call(this)) return;
  switch (this._state) {
    case this._STATES.PATROL:
      this.patrol();
      break;

    case this._STATES.ATTACK:
      this.attack('melee' + this._direction);
      break;

    case this._STATES.CINEMATIC:
      this._playCinematic();
      break;
  }

  if (!this.inCinematic) {
    this._state = this.playerInRange(player, null, player.getSprite().height * 2) && this.facingPlayer(player) ? this._STATES.ATTACK : this._STATES.PATROL;
  }
}

Boss.prototype.patrol = function() {
  this.move(this._direction);
  this.attack('range' + this._direction, 2);
  var offset = (this._direction === 'left') ? 0 : (3 * (this._sprite.width / 4));
  this._bulletPool.fireBullet(this._sprite.x + offset, this._sprite.y, this._direction);
}

Boss.prototype.create = function(x, y, frame) {
  Enemy.prototype.create.call(this, x, y, frame);
  this.createBulletPool('drumstick', true, 500);
  this._bulletPool.setFireRate(1500);

  // add extra animations
  this.addAnimation('meleeleft', ['meleeleft1.png', 'meleeleft2.png', 'meleeleft3.png'], this._animComplete);
  this.addAnimation('rangeleft', ['rangeleft1.png', 'rangeleft2.png'], this._animComplete);

  this.addAnimation('meleeright', ['meleeright1.png', 'meleeright2.png', 'meleeright3.png'], this._animComplete);
  this.addAnimation('rangeright', ['rangeright1.png', 'rangeright2.png'], this._animComplete);

  this._sprite.body.setSize(47, 80, 60, 15);
  nameText = this._game.add.text(this._healthX - 10, this._healthOneY - 25, 'Salem Guido', { font: "18px Arial", fill: "#CC0000", align: "left"}); 
  this._createHealthPool();
  this._drawHealth();

  cinText = game.add.text(this._healthX - 600, 80, '', { font: "18px Arial", fill: "#19de65", align: "center"});
}

Boss.prototype._createHealthPool = function() {
  this._healthPool = this._game.add.group();
  for (var i = 0; i < this._ENEMY_HEALTH; i++) {
    if (i < 5) {
      var child = this._healthPool.create(this._healthX + this._drumstickTextOffset * i, this._healthOneY, 'drumstick');
    } else {
      var child = this._healthPool.create(this._healthX + this._drumstickTextOffset * (i - 5), this._healthTwoY, 'drumstick');
    }
  }
}

/**
 * Draws the boss's health as drumsticks at the top left of the screen
 */
Boss.prototype._drawHealth = function() {
  this._healthPool.callAll('kill');
  for (var i = 0; i < this._health; i++) {
    var child = this._healthPool.getChildAt(i);
     if (i < 5) {
      child.reset(this._healthX + this._drumstickTextOffset * i, this._healthOneY);
    } else {
      child.reset(this._healthX + this._drumstickTextOffset * (i - 5), this._healthTwoY);
    }
  }
}

Boss.prototype.hurt = function() {
  if (!this.inCinematic) {
    Entity.prototype.hurt.call(this);
    this._drawHealth();
  }
}

Boss.prototype._playCinematic = function() {
  this.inCinematic = true;
  this._nextLine();  
}

Boss.prototype._nextLine = function() {

    if (lineIndex === cinematicText.length)
    {
        //  We're finished
        this.inCinematic = false;
        game.time.events.add(Phaser.Timer.SECOND * 3, this._clearCinematic, this);
        this._state = this._STATES.PATROL;
        return;
    }

    //  Split the current line on spaces, so one word per array element
    line = cinematicText[lineIndex].split(' ');

    //  Reset the word index to zero (the first word in the line)
    wordIndex = 0;

    //  Call the 'nextWord' function once for each word in the line (line.length)
    game.time.events.repeat(wordDelay, line.length, this._nextWord, this);

    //  Advance to the next line
    lineIndex++;

}

Boss.prototype._nextWord = function() {

    //  Add the next word onto the text string, followed by a space
    cinText.text = cinText.text.concat(line[wordIndex] + " ");
    //  Advance the word index to the next word in the line
    wordIndex++;

    //  Last word?
    if (wordIndex === line.length)
    {
        //  Add a carriage return
        cinText.text = cinText.text.concat("\n");

        //  Get the next line after the lineDelay amount of ms has elapsed
        game.time.events.add(lineDelay, this._nextLine, this);
    }

}

Boss.prototype._clearCinematic = function() {
  cinText.text = "";
}

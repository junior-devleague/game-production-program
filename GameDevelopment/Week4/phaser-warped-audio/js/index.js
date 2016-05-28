(function() {
   
  var WarpedSound = function(game, key, volume, loop) {
    Phaser.Sound.call(this, game, key, volume, loop);
    game.sound._sounds.push(this);
  }
   
  WarpedSound.prototype = Object.create(Phaser.Sound.prototype);
  
  WarpedSound.prototype.constructor = WarpedSound;
  
  WarpedSound.prototype.setSpeed = function(speed) {
    if(!!this._sound) {
      this._sound.playbackRate.value = speed;
    } else {
      this.onPlay.addOnce(function() {
        this._sound.playbackRate.value = speed;
      }, this);
    }
  }
  
  WarpedSound.prototype.tweenSpeed = function(speed, duration) {
    function applyTween(s, d) {
      game.add.tween(this._sound.playbackRate).to({value: s}, d, Phaser.Easing.Linear.NONE, true);
    }
    if(!!this._sound) {
      applyTween.call(this, speed, duration);
    } else {
      this.onPlay.addOnce(function() {
         applyTween.call(this, speed, duration)
      }, this);
    }
  }
  
  WarpedSound.prototype.createFilter = function(maxHZ) {
    maxHZ = maxHZ || 440;
    function applyFilter(hz) {
      this._filter = this.context.createBiquadFilter();
      // Create the audio graph.
      this._sound.connect(this._filter);
      this._filter.connect(this.context.destination);
      // Create and specify parameters for the low-pass filter.
      this._filter.type = 0; // Low-pass filter. See BiquadFilterNode docs
      this._filter.frequency.value = hz; // Set cutoff to passed in HZ
    };
    
    if(!!this._sound) {
      applyFilter.call(this, maxHZ);
    } else {
      this.onPlay.addOnce(function() {
         applyFilter.call(this, maxHZ)
      }, this);
    }
  };
  
  WarpedSound.prototype.tweenFilter = function(maxHZ, duration) {
    maxHZ = maxHZ || 100;
    duration = duration || 1000;
    function applyTween(s, d) {
      if(!this._filter) {
        this.createFilter();
      }
      game.add.tween(this._filter.frequency).to({value: s}, d, Phaser.Easing.Linear.NONE, true);
    }
    if(!!this._sound) {
      applyTween.call(this, maxHZ, duration);
    } else {
      this.onPlay.addOnce(function() {
         applyTween.call(this, maxHZ, duration)
      }, this);
    }
  }
  
  var audio, instructionText, style, spacebar, direction;
  var game = new Phaser.Game(800,600, Phaser.AUTO, 'phaser-demo', {preload: preload, create: create, update: update});
  
  
  function preload() {
    game.load.audio('gameMusic', ['https://dl.dropboxusercontent.com/u/134359065/gamedev/warpedAudio/stage-one.mp3', 'https://dl.dropboxusercontent.com/u/134359065/gamedev/warpedAudio/stage-one.ogg']);

  }
  
  function create() {
    audio = new WarpedSound(game, 'gameMusic', 0.3);

    
    var loadingEl = document.getElementById('loading');
    loadingEl.style.display = 'none';
    var phaserEl = document.getElementById('phaser-demo');
    phaserEl.style.display = 'block';
    
    
    
    style = { font: "18px Arial", fill: "#fff", align: "center" };

    instructionText = game.add.text(10,10, 'Once music has started, press space to create a slow down effect. Press it again to bring it back', style);
    
    var spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebar.onDown.add(degenerate, this);
    
    audio.play();
    audio.onResume.add(function() {
      console.debug('resumed.');})
    
  }
  
  
  function degenerate() {
    if(!direction) {
      audio.tweenSpeed(0.5);
      audio.tweenFilter(150, 1000);
      direction = true;
    } else {
      audio.tweenSpeed(1, 1000);
      audio.tweenFilter(5000, 1000);
      direction = false;
    }
  }
  function update() {
    
  }
  
  
  
}());
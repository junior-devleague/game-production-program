//This sets the variable for the mouse
var mouse;

//This sets the score to start at -1.
var score = -1;

//This is the object which runs the game.
var mainState = {
	preload: function(){
		//These four things sets the assets for the game.
		game.load.image('ship', 'assets/ship.png');
	}

	create: function(){
		//This sets the game physics to Arcade style.
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//This sets the background color to something.
		game.stage.backgroundColor = '#3498db';
	}
};

//This sets the size of the game screen and sets it to the div "gameDiv".
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

//This starts the game, by running the object "mainState".
game.state.add('main', mainState);
game.state.start('main');
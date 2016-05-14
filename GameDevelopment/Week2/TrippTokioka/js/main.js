//This sets the variable for the spacebar.
var spaceKey;

//This sets the score to start at -1.
var score = -1;

//This is the object which runs the game.
var mainState = {

	preload: function(){

		//These foure things sets the assets for the game. If you want to add music or images, there is where you would preload it.
		game.load.image('background', 'assets/background.png');
		game.load.image('Goblin', 'assets/Goblin1.png');
		game.load.image('ground', 'assets/wallHorizontal.png');
		game.load.image('obstacle', 'assets/wallVertical.png');
		//If you'd like to load music files, the format would look like this. game.load.audio('[name of music]', ['[location for music file]']);

	},

	create: function(){

		//This sets the game physics to Arcade style.
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//This sets the background color to #3498db on the hex system.
		game.stage.backgroundColor = '#3498db';

		//This gives us sharp corners for all of our images.
		game.renderer.renderSession.roundPixels = true;

		//This would be a good place to start the general background music for the game.

		//This sets up a group call platforms. For future functionality we can set all horizontal surfaces to this group.
		platforms = game.add.group();
		platforms.enableBody = true;

		//This creates the ground, and makes it solid object the player will not pass through.
		this.ground = platforms.create(0, game.world.height, 'ground');
		this.ground.anchor.setTo(0,1);
		this.ground.scale.setTo(4, 1);
		game.physics.arcade.enable(this.ground);
		this.ground.body.immovable = true;

		//This creates the player character at the bottom left side of the screen.
		this.player = game.add.sprite(game.width/5, game.world.height*(2/7), 'Goblin');
		game.physics.arcade.enable(this.player);
		this.player.scale.setTo(0.15,0.15);
		this.player.anchor.setTo(0,0);

		//This sets the spacebar key as the input for this game.
		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		//This sets the physics on the player in terms of the gravity and the bounce.
		this.player.body.bounce.y = 0;
		this.player.body.gravity.y = 300;

		//This creates the first obstacle on the right side of the screen.
		this.obstacle = game.add.sprite(700,game.world.height, 'obstacle');
		this.obstacle.scale.setTo(1,0.2);
		this.obstacle.anchor.setTo(0,1);
		game.physics.arcade.enable(this.obstacle);
		this.obstacle.body.immovable = true;

		//This adds the scoreboard on the top left side of the screen.
		scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
	},

	update: function(){

		//This is where the game engine recognizes collision betwen the player and the ground or the obstacle.
		game.physics.arcade.collide(this.player, this.ground);
		game.physics.arcade.collide(this.player, this.obstacle);

		//This will set the horizontal movement to zero.
		this.player.body.velocity.x = 0;

		//This will create a new wall if the old wall goes off the screen.
		if (this.obstacle.x < 0) {
			this.obstacle.kill();
			this.obstacle = game.add.sprite(900,game.world.height, 'obstacle');
			this.obstacle.scale.setTo(1,0.2);
			this.obstacle.anchor.setTo(0,1);
			game.physics.arcade.enable(this.obstacle);
			this.obstacle.body.immovable = true;
		};

		//This creates a place to add sound when the obstacle reaches the player.
		if (this.obstacle.x < 20 && this.obstacle.x > 15) {
			console.log("sound!");
			//This is where you'd add a sound que when the obstacle reaches the player.
		}

		//This will move the obstacle to the left if it is on the right side of the screen.
		if (this.obstacle.x > 100) {
			this.obstacle.x -= 0.5;
		};

		//This allows the player to jump only if you press the space key and the player is touching the something at the bottom.
		if (this.spaceKey.isDown && this.player.body.touching.down){
			this.player.body.velocity.y = -300;
			//This is a good place to add the sound for when the player jumps.
		};

		//This will update the score if the player has not been pushed off the screen, and the wall has gone off the left side.
		if (this.obstacle.x < 5 && this.player.x > 5){
			score++;
			scoreText.text = 'score: ' + score;
		};

		//This will tell you "You Lose!" if the player is pushed off the left side of the screen.
		if (this.player.x < 0){
			scoreText = game.add.text(350,200, 'Get Rekt!', {fill: '#ff0000'});
			this.obstacle.kill();
			this.player.kill();
		};
	}
};

//This sets the size of the game screen and sets it to the div "gameDiv".
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

//This starts the game, by running the object "mainState".
game.state.add('main', mainState);
game.state.start('main');
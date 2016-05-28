//This sets the variable for the ship.
var sprite;

//This sets the score to start at -1.
var score = -1;

//bullet variable.


//This is the object which runs the game.
var mainState = {
	preload: function(){
		//These four things sets the assets for the game.
		game.load.image('ship', 'assets/ship.png');
		game.load.image('enemy', 'assets/enemy.png')
	},

	create: function(){
		//This sets the game physics to Arcade style.
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//enable the game physics
		sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');
        game.physics.enable(sprite, Phaser.Physics.ARCADE);

		//This sets the background color to something.
		game.stage.backgroundColor = 'purple';

		//This gives us sharp corners for all of our images.
		game.renderer.renderSession.roundPixels = true;

		//hotkeys

		//This would be a good place to start the general background music for the game.

		//scale sprite
		sprite.scale.setTo(0.15,0.15);

		//The enemy testing
		this.enemy = game.add.sprite(800,550, 'enemy');
		this.enemy.scale.setTo(1,1);
		this.enemy.anchor.setTo(2,2);
		game.physics.arcade.enable(this.enemy);
		this.enemy.body. immovable = true;
	},

	update: function(){
	game.physics.arcade.collide(this.ship, this.enemy);
        //  400 is the speed it will move towards the mouse
        game.physics.arcade.moveToPointer(sprite, 400);

        //  if it's overlapping the mouse, don't move any more
        if (Phaser.Rectangle.contains(sprite.body, game.input.x, game.input.y))
        {
            sprite.body.velocity.setTo(0, 0);
        }
	}
};

//This sets the size of the game screen and sets it to the div "gameDiv".
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

//This starts the game, by running the object "mainState".
game.state.add('main', mainState);
game.state.start('main');

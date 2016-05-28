var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

//This sets the variable for the ship.
var sprite;

//This sets the score to start at -1.
var score = -1;

//bullet variable.
var bullets;
var bulletTime = 0;
var firingTimer = 0;
var fireButton;

//This is the object which runs the game.
	function preload(){
		//These four things sets the assets for the game.
		game.load.image('ship', 'assets/ship.png');
		game.load.image('enemy', 'assets/enemy.png');
        game.load.image('bullet', 'assets/bullet.png');
	}

	function create(){
		//This sets the game physics to Arcade style.
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//enable the game physics
		sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');
        game.physics.enable(sprite, Phaser.Physics.ARCADE);

		//This sets the background color to something.
		game.stage.backgroundColor = 'purple';

		//This gives us sharp corners for all of our images.
		game.renderer.renderSession.roundPixels = true;

		//  Our bullet group
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, 'bullet');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 1);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);

		//scale sprite
		sprite.scale.setTo(0.15,0.15);

		//The enemy testing
		this.enemy = game.add.sprite(800,550, 'enemy');
		this.enemy.scale.setTo(1,1);
		this.enemy.anchor.setTo(2,2);
		game.physics.arcade.enable(this.enemy);
		this.enemy.body. immovable = true;
        
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	}
    
    

	function update(){
	game.physics.arcade.collide(this.ship, this.enemy);
        //  400 is the speed it will move towards the mouse
        game.physics.arcade.moveToPointer(sprite, 600);

        //  if it's overlapping the mouse, don't move any more
        if (Phaser.Rectangle.contains(sprite.body, game.input.x, game.input.y))
        {
            sprite.body.velocity.setTo(0, 0);
        }
        
        
        if (sprite.alive){

            //  Firing?
            if (fireButton.isDown)
            {
                fireBullet();
            }

        }
	}
    
    function render() {

        // for (var i = 0; i < aliens.length; i++)
        // {
        //     game.debug.body(aliens.children[i]);
        // }

    }
    
    function fireBullet () {

        //  To avoid them being allowed to fire too fast we set a time limit
        if (game.time.now > bulletTime)
        {   
            //  Grab the first bullet we can from the pool
            bullet = bullets.getFirstExists(false);

            if (bullet)
            {
                //  And fire it
                bullet.reset(sprite.x, sprite.y + 8);
                bullet.body.velocity.x = +400;
                bulletTime = game.time.now + 200;
            }
        }

    }

        function resetBullet(bullet) {

        //  Called if the bullet goes out of the screen
        bullet.kill();

    }

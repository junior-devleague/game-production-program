var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

//This sets the variable for the ship.
var sprite;
var aliens;
var bullets;
var bulletTime = 0;
var cursors;
var fireButton;
var explosions;
var starfield;
var score = 0;
var scoreString = '';
var scoreText;
var lives;
var enemyBullet;
var firingTimer = 0;
var stateText;
var livingEnemies = [];
var audio;
var gameMusic;


//This is the object which runs the game.
	function preload(){
		//These four things sets the assets for the game.
		game.load.image('ship', 'assets/ship.png');
		game.load.image('invader', 'assets/invader32x.png');
        game.load.image('bullet', 'assets/bulletnew.png');
        game.load.image('enemyBullet', 'assets/enemyBullet.png');
        game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
        game.load.image('starfield', 'assets/background.png');
        game.load.audio('music', 'assets/music/mainSong.mp3');
	}

	function create(){
        //  The scrolling starfield background
    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');
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
        
        // The enemy's bullets
        enemyBullets = game.add.group();
        enemyBullets.enableBody = true;
        enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullets.createMultiple(30, 'enemyBullet');
        enemyBullets.setAll('anchor.x', 0.5);
        enemyBullets.setAll('anchor.y', 1);
        enemyBullets.setAll('outOfBoundsKill', true);
        enemyBullets.setAll('checkWorldBounds', true);

		//scale sprite
		sprite.scale.setTo(0.15,0.15);
        game.physics.enable(sprite, Phaser.Physics.ARCADE);

		//  The baddies!
        aliens = game.add.group();
        aliens.enableBody = true;
        aliens.physicsBodyType = Phaser.Physics.ARCADE;

        createAliens();
        
        //  An explosion pool
        explosions = game.add.group();
        explosions.createMultiple(30, 'kaboom');
        explosions.forEach(setupInvader, this);
        
        //firing button
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        gamemus = game.add.audio('music');
        gamemus.loop = true;
        gamemus.play();
        
        

	}

    function createAliens () {

        for (var y = 0; y < 40; y+=10)
        {
            for (var x = 30; x < 60; x+=10)
            {
                var alien = aliens.create(x * 10, y * 10, 'invader');
                alien.anchor.setTo(0.5, 0.5);
                alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
                alien.play('fly');
                alien.body.moves = false;
            }
        }

        aliens.x = 300;
        aliens.y = 450;

        //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
        var tween = game.add.tween(aliens).to( { y: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

        //  When the tween loops it calls descend
        tween.onLoop.add(descend, this);
    }

    function setupInvader (invader) {

        invader.anchor.x = 0.5;
        invader.anchor.y = 0.5;
        invader.animations.add('kaboom');

    }

    function descend() {

        aliens.x -=10;

    }
    
    

	function update(){
        
        //  Scroll the background
        starfield.tilePosition.x += 2;
        
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
            
            if (game.time.now > firingTimer)
            {
                enemyFires();
            }

        }
	}
    //  Run collision
    game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
    game.physics.arcade.overlap(enemyBullets, sprite, enemyHitsPlayer, null, this);
    
    function render() {

        // for (var i = 0; i < aliens.length; i++)
        // {
        //     game.debug.body(aliens.children[i]);
        // }

    }

    function collisionHandler (bullet, alien) {

        //  When a bullet hits an alien we kill them both
        bullet.kill();
        alien.kill();

        //  Increase the score
        score += 20;
        scoreText.text = scoreString + score;

        //  And create an explosion :)
        var explosion = explosions.getFirstExists(false);
        explosion.reset(alien.body.x, alien.body.y);
        explosion.play('kaboom', 30, false, true);

        if (aliens.countLiving() == 0)
        {
            score += 1000;
            scoreText.text = scoreString + score;

            enemyBullets.callAll('kill',this);
            stateText.text = " You Won, \n Click to restart";
            stateText.visible = true;

            //the "click to restart" handler
            game.input.onTap.addOnce(restart,this);
        }

    }

    function enemyHitsPlayer (sprite,bullet) {

        bullet.kill();

        live = lives.getFirstAlive();

        if (live)
        {
            live.kill();
        }

        //  And create an explosion :)
        var explosion = explosions.getFirstExists(false);
        explosion.reset(sprite.body.x, sprite.body.y);
        explosion.play('kaboom', 30, false, true);

        // When the player dies
        if (lives.countLiving() < 1)
        {
            sprite.kill();
            enemyBullets.callAll('kill');

            stateText.text=" GAME OVER \n Click to restart";
            stateText.visible = true;

            //the "click to restart" handler
            game.input.onTap.addOnce(restart,this);
        }

    }

    function enemyFires () {

        //  Grab the first bullet we can from the pool
        enemyBullet = enemyBullets.getFirstExists(false);

        livingEnemies.length=0;

        aliens.forEachAlive(function(alien){

            // put every living enemy in an array
            livingEnemies.push(alien);
        });


        if (enemyBullet && livingEnemies.length > 0)
        {

            var random=game.rnd.integerInRange(0,livingEnemies.length-1);

            // randomly select one of them
            var shooter=livingEnemies[random];
            // And fire the bullet from this enemy
            enemyBullet.reset(shooter.body.x, shooter.body.y);

            game.physics.arcade.moveToObject(enemyBullet,sprite,120);
            firingTimer = game.time.now + 2000;
        }

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

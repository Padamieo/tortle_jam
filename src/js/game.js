import phaser from 'phaser';
import Turt from './turtle';
import Fruit from './fruit';

import setupAnimations from './animations';
import all from 'assets/turtle.png';
import bg from 'assets/uv-grid-diag.png';

class GameScene extends phaser.Scene {
	constructor(test) {
		super({
			key: 'GameScene'
		});
	}

	preload() {
		this.load.image('bg', bg);
		this.load.spritesheet('all',
			all,
			{ frameWidth: 16, frameHeight: 16, endFrame: 11 }
		);

		//this.load.image('all', turtle);
	}

	create () {
		setupAnimations(this);

		// for (var y = 0; y < 4; y++) {
		//   for (var x = 0; x < 4; x++) {
		// this.add.image(1024 * x, 1024 * y, 'bg').setOrigin(0).setAlpha(0.75);
		//   }
		// }

		this.bottom = 0;
		this.top = 1024;
		this.physics.world.setBounds(this.bottom, this.bottom, this.top, this.top);
		this.add.image(0, 0, 'bg').setOrigin(0);

		// var tile = this.add.sprite(0, 0, 'all').setOrigin(0).setScale(20);//.setTint(0xff0044);
		// tile.setFrame(8);
		//.setRotation(-Math.PI * 0.25);

		var tilesprite = this.add.tileSprite(0, 0, 50, 50, 'all').setFrame(10).setOrigin(0).setScale(10);
		console.log(tilesprite);

		var x = phaser.Math.Between(this.bottom, this.top);
		var y = phaser.Math.Between(this.bottom, this.top);

		this.turtles = this.add.group();
		// this.fruits = this.add.group();
		this.fruits = this.physics.add.group();
		console.log(this.fruits);
		this.fruits.createMultipleCallback = false;

		this.turtle = new Turt( this, x, y );
		//game.turtle.alpha = 0.5;

		this.camera = this.cameras.main.startFollow(
			this.turtle,
			true, 0.08, 0.08
		);
		this.camera.setBackgroundColor('rgb(50, 50, 10)');

		this.line = new phaser.Geom.Line(0,0,100,100);
		this.graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });
		this.graphics.strokeLineShape(this.line);

		//new Turt( this, phaser.Math.Between(this.bottom, this.top), phaser.Math.Between(this.bottom, this.top) );
		//new Fruit( this, phaser.Math.Between(this.bottom, this.top), phaser.Math.Between(this.bottom, this.top) );

		this.physics.add.collider(this.turtle, this.turtles, () => {
			console.log('impact');
		});

		// this.physics.world.collide(this.turtle, this.physics.world, () => {
		//   console.log('world');
		// });

		/*
    this.physics.add.overlap(this.fruits, this.turtle, (turtle, fruit) => {
      //console.log(fruit);
      if(!fruit.eaten){
        console.log('over', fruit.id, fruit.eaten);
        fruit.collected(this.turtle.id, this);
        fruit.destroy();
        //this.fruits.refresh();
      }
    });
    */

		var io = require('socket.io-client');
		window.game.socket = io.connect('http://localhost:4000', {
			reconnection:false
		});

		window.game.socket.on('connect', () => {
			window.game.socket.emit('start', {x,y});
		});

		this.keys = this.input.keyboard.addKeys('S,Z');

		// camera tween
		// this.tween = this.tweens.addCounter({
		//   paused: true,
		//   from: 1,
		//   to: 0.5,
		//   duration: 1000,
		//   //loop : -1,
		//   onComplete: () => {
		//     console.log('onComplete');
		//     var a = this.tween.from;
		//     var b = this.tween.to;
		//     this.tween.from = b;
		//     this.tween.to = a;
		//     this.tween.pause();
		//   }
		// });
		//this.tween.pause();
		//this.camera.setViewport(0, 0, 400, 400);

		// particles for slide
		var particles = this.add.particles('all').setFrame(11);
		console.log(particles);
		this.particles = particles.createEmitter({
			quantity: 1,
			lifespan: 600,
			speed: { min: 10, max: 100 },
			angle: { min: 0, max: 360 },
			alpha: { start: 1, end: 0 },
			scale: { start: 0.5, end: 1 },
			on: false
		});

	}

	update(){
		this.turtle.update();

		if(this.keys.S.isDown){
			this.turtle.setVelocity(0, 0);
		}

		/*
    if(this.keys.Z.isDown){
      if(!this.tween.isPlaying()){
        this.tween.play();
      }
      //console.log(this.camera.zoom, this.tween);
      this.camera.zoom = this.tween.getValue();
    }else{
      //if(!this.tween.isPlaying()){
        this.tween.play();
      //}
      //if(this.camera.zoom !== 1){
        this.camera.zoom = this.tween.getValue();
      //}
    }
    */

		if(this.turtle.moving === false){
			if(this.input.activePointer.isDown){
				this.graphics.clear();
				this.graphics.strokeLineShape(this.line);
				this.line.setTo(
					this.turtle.x,
					this.turtle.y,
					this.input.activePointer.worldX,
					this.input.activePointer.worldY
				);
				this.input.d = true;
			}else{
				this.graphics.clear();
				if(this.input.d){
					this.input.d = false;
					var angle = phaser.Math.Angle.Between(
						this.input.activePointer.worldX,
						this.input.activePointer.worldY,
						this.turtle.x,
						this.turtle.y
					);
					var velocity = new phaser.Math.Vector2();
					this.physics.velocityFromRotation(angle, 500, velocity);
					this.turtle.setVelocity(velocity.x, velocity.y);
				}
			}
		}else{
			this.graphics.clear();
			if(this.input.activePointer.isDown){
				if(this.turtle.breakable){
					console.log('slow', this.turtle.body.speed, this.turtle.body.velocity);
					// this.turtle.body.setVelocityX(
					//   this.turtle.body.velocity.x*0.9
					// );
					// this.turtle.body.setVelocityY(
					//   this.turtle.body.velocity.y*0.9
					// );
					this.particles.emitParticleAt(this.turtle.body.x, this.turtle.body.y);
				}
			}
		}

		if(window.game.socket.connected){

			window.game.socket.on('setup', (id, fruit, turtles) => {
				window.console.log('you are:' + id);
				this.turtle.id = id;
				this.turtle.alpha = 1;
				for (var i = 0; i < fruit.length; i++) {
					this.addFruit(fruit[i].id, fruit[i].x, fruit[i].y);
				}
				if(turtles || turtles.length !== 0 || turtles.length !== null){
					for (var i = 0; i < turtles.length; i++) {
						console.log('turtles', turtles[i]);
						if(turtles[i] !== null){
							if(turtles[i].id !== this.turtle.id){
								new Turt( this, parseInt(turtles[i].x), parseInt(turtles[i].y));
							}
						}
					}
				}
			});

			window.game.socket.on('player', (turtle) =>{
				if(turtle.id !== this.turtle.id){
					new Turt( this, turtle.x, turtle.y);
				}
			});

			window.game.socket.on('update', (data) => {
				console.log('update');
				if(data.id !== this.turtle.id){
					console.log(data);
				}
			});

			window.game.socket.on('position', (position) => {
				console.log('create enemy');
				console.log(this.turtles);
				var tortle = new Turt( this, position.x, position.y);
				this.turtles.add(tortle);
				//this.physics.add.collider(this.turtles, this.turtle);
				console.log(this.turtles);
				// this.add.sprite(position.x, position.y, 'placeholder');
			});

			window.game.socket.on('fruit', (position) => {
				this.addFruit(position.id, position.x, position.y);
			});

			window.game.socket.on('disconnected', (id) => {
				console.log('disconnected');
			});

		}

	}

	addFruit(i, x, y){
		var a = new Fruit( this, x, y);
		a.id = i;
	}
}
export default GameScene;

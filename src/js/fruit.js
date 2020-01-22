import phaser from 'phaser';

class Fruit extends phaser.Physics.Arcade.Sprite {
	constructor (scene, x, y) {
		super(scene, x, y, 'all');
		var d = phaser.Math.Distance.Between(scene.turtle.body.x, scene.turtle.body.y, this.x, this.y);
		if(d < 100){
			console.log('delay spawn');
		}else{
			this.spawnFruit(scene);
		}

	}

	spawnFruit(scene){
		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.setFrame(9);
		this.setScale(5);
		// this.add.sprite(x, y, 'placeholder');
		// this.setTexture('placeholder').setOrigin(0.5, 0.5);
		// this.setPosition(x, y);

		//scene.add.sprite(x, y, 'placeholder');
		//this.setTexture('placeholder').setOrigin(0.5, 0.5);
		//this.setScale(0.5);

		//scene.stage.add(this);
		//this.setCollideWorldBounds(true);
		scene.fruits.add(this);
		this.eaten = false;

		this.collect = scene.physics.add.overlap(scene.fruits, scene.turtle, this.collect.bind);
		/*
      function(turtle, fruit){
        console.log('over', fruit.id, fruit.eaten, this);
        if(!fruit.eaten){
        //   console.log('over', fruit.id, fruit.eaten);
          fruit.collected(turtle.id, scene);
          fruit.eaten = true;
        //   fruit.destroy();
        //   //this.fruits.refresh();
        //   this.collect = null;
        this.eaten = true;
        }
        fruit.destroy();
        fruit.collect = null;
        this.collect = null;
      });
      */

	}

	collect(){
		console.log('test');
	}

	collected(turtle_id, scene){
		if(this.eaten){
			return;
		}
		console.log(phaser.Math.Distance.Between(scene.turtle.body.x, scene.turtle.body.y, this.x, this.y));
		this.alpha = 0;
		if(window.game.socket.connected){
			window.game.socket.emit('eaten', this.id, turtle_id);
		}
		this.eaten = true;
		this.destroy();
		this.collect = null;
	}

	preUpdate (time, delta) {
		super.preUpdate(time, delta);
		/*
      console.log(this);
      if(phaser.Math.Distance.Between(scene.turtle.body.x, scene.turtle.body.y, this.x, this.y)) < 50){
        this.collected(scene.turtle.id, scene);
      }
      */
	}
}

export default Fruit;

import phaser from 'phaser';

class Fruit extends phaser.GameObjects.Sprite {
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
    }

    preUpdate (time, delta) {
      super.preUpdate(time, delta);
      console.log(phaser.Math.Distance.Between(game.turtle.body.x, game.turtle.body.y, this.x, this.y));
      // if(true){
      //   this.alpha = 0.5;
      // }else{
      //   this.alpha = 1;
      // }
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
    }

    preUpdate (time, delta) {
      super.preUpdate(time, delta);

    }
}

export default Fruit;

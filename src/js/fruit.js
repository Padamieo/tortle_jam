import phaser from 'phaser';

class Fruit extends phaser.GameObjects.Sprite {
    constructor (scene, x, y) {
      super(scene, x, y, 'turtle');
      scene.add.existing(this);


      scene.physics.add.existing(this);
      
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
    }

    collected(){
      this.alpha = 0;
      this.destroy();
    }

    preUpdate (time, delta) {
      super.preUpdate(time, delta);

    }
}

export default Fruit;

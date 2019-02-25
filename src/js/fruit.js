import phaser from 'phaser';

class Fruit extends phaser.GameObjects.Sprite {
    constructor (scene, x, y) {
      super(scene, x, y, 'all');
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setFrame(7);
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

    collected(turtle_id){
      this.alpha = 0;
      this.destroy();
      if(window.game.socket.connected){
        window.game.socket.emit('eaten', this.id, turtle_id);
      }
    }

    preUpdate (time, delta) {
      super.preUpdate(time, delta);

    }
}

export default Fruit;

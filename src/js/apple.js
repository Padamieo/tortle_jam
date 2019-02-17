import phaser from 'phaser';

class Apple extends phaser.GameObjects.Sprite {
    constructor (scene, x, y) {
      super(scene, x, y, 'placeholder');
      scene.add.existing(this);
      // this.add.sprite(x, y, 'placeholder');
      // this.setTexture('placeholder').setOrigin(0.5, 0.5);
      // this.setPosition(x, y);

      //scene.add.sprite(x, y, 'placeholder');
      //this.setTexture('placeholder').setOrigin(0.5, 0.5);
      //this.setScale(0.5);

      //scene.stage.add(this);

    }


    preUpdate (time, delta) {
      super.preUpdate(time, delta);

    }
}

export default Apple;

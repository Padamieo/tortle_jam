import phaser from 'phaser';

// class Turt extends phaser.GameObjects.Sprite {
class Turt extends phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
      super(scene, x, y, 'sprite');

      this.setTexture('placeholder').setOrigin(0.5, 0.5);
      this.setPosition(x, y);

      scene.physics.add.existing(this);

      this.setCircle(this.height*0.5);

      this.body.setDrag(0, 0);

      this.setBounce(0.99);
      this.setScale(0.5);
      this.setOrigin(0.5, 0.5);

      this.body.setAllowGravity(false);
      this.body.setMass(10);

      this.setCollideWorldBounds(true);
      this.body.stopVelocityOnCollide = true;

      this.moving = false;
      scene.add.existing(this);
      console.log('turtle', this);
    }

    update (game) {
    }

    preUpdate (time, delta) {
      super.preUpdate(time, delta);

      // if(this.body.isMoving){
      //   console.log('this.body.isMoving', this.body.isMoving);
      // }

      if(this.body.position.x !== this.body.prev.x){
        console.log(this.body.position.x, this.body.prev.x);
        console.log('moving');
      }

      if(this.body.velocity !== 0){
        this.moving = true;
      }

      if(this.body.speed <= 50){
        //this.body.stop();
        this.moving = false;
      }

    }
}

export default Turt;

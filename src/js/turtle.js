import phaser from 'phaser';

// class Turt extends phaser.GameObjects.Sprite {
class Turt extends phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
      super(scene, x, y, 'sprite');

      this.setTexture('placeholder').setOrigin(0.5, 0.5);
      this.setPosition(x, y);

      scene.physics.add.existing(this);

      //this.setCircle(this.height*0.5);

      this.body.setDrag(1, 1);

      this.setBounce(0.7);
      this.setScale(0.5);
      this.setOrigin(0.5, 0.5);
      var w = this.width*0.7;
      var h = this.height*0.7;
      this.body.setSize(w, h, true);
      this.body.setAllowGravity(false);
      this.body.setMass(10);
      var ww = (this.width - w)*0.5;
      var hh = (this.height - h)*0.5;
      this.body.offset = {x:ww, y:hh};
      //this.body.scaleX = 0.3;
      this.body.angularDrag = 4;
      this.body.angularVelocity = 0;

      this.setCollideWorldBounds(true);
      this.body.stopVelocityOnCollide = false;

      this.moving = false;
      scene.add.existing(this);
      console.log('turtle', this);

      scene.turtles.add(this);
      scene.physics.add.collider(this, scene.turtles);
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

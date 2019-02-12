import phaser from 'phaser';
//class Turt extends phaser.GameObjects.Sprite {
class Turt extends phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
      super(scene, x, y);
      //this.physics.add.image(1024, 1024, 'placeholder');
      //game.group.add(this);
      this.setTexture('placeholder').setOrigin(0.5, 0.5);
      this.setPosition(x, y);

      //this.setScale(0.5);
      //this.setVelocityX(5);

      //this.velocity = {};
      // this.velocity.x = 5;
      // this.velocity.y = 3;
      //this.friction = 0.001;

      //scene.add.existing(this);
      scene.physics.add.existing(this);
      //this.angularVelocity = 60;
      this.setCircle(this.height*0.5);
      // this.setCircle(this.height*0.35).setOrigin(0.5, 0.5);
      //this.body.setFriction(10, 10);
      //this.body.setDrag(10, 10);
      //this.body.setAcceloration(10, 10);
      //this.setSize(48, 48, true);
      this.setBounce(1.1);
      this.setScale(0.5);
      this.setOrigin(0.5, 0.5);
      this.setVelocity(100);

      this.setCollideWorldBounds(true);

      //this.setVelocity(0, 0);
      // this.body.worldBounce = true;
      window.console.log(this);

    }

    update () {
      if(this.body.position.x !== this.body.prev.x){
        console.log('this.body.isMoving', this.body.isMoving);
      }
      // super.update(time, delta);
      // console.log('update');
    }

    preUpdate (time, delta) {
      super.preUpdate(time, delta);

      if(this.body.isMoving){
        console.log('this.body.isMoving', this.body.isMoving);
      }

      if(this.body.position.x !== this.body.prev.x){
        console.log(this.body.position.x, this.body.prev.x);
        console.log('moving');
      }
      //console.log('uuppp');

      // window.console.log(this.body.isMoving);
      // if(this.body.velocity.x < 0){
      //   window.console.log(this.body.velocity);
      // }
      //window.console.log(this);
      // this.x += this.velocity.x;
      // this.y += this.velocity.y;
      //this.velocity.x = (this.velocity.x < 0 ? this.velocity.x + this.friction : this.velocity.x - this.friction);
      //this.velocity.y = (this.velocity.y < 0 ? this.velocity.y + this.friction : this.velocity.y - this.friction);
      //this.velocity = this.velocity-0.1;
      // if(this.x > 1024 || this.x < 0){
      //   this.velocity.x = this.velocity.x*-1;
      // }
      //
      // if(this.y > 1024 || this.y < 0){
      //   this.velocity.y = this.velocity.y*-1;
      // }

    }
}

export default Turt;

import phaser from 'phaser';

// class Turt extends phaser.GameObjects.Sprite {
class Turt extends phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
      super(scene, x, y, 'all');

      //this.setTexture('all').setOrigin(0.5, 0.5);
      scene.add.existing(this);

      this.setRotation(phaser.Math.DegToRad(180));

      this.anims.play('vertical_out', true);
      this.flipX = false;
      this.flipY = false;

      this.direction = 1;

      this.on('animationupdate-vertical_crawl', () => {
        //console.log(this.anims.currentAnim.key);
        this.flipX = !this.flipX;
      }, this);

      this.on('animationupdate-diagonal_crawl', () => {
        //console.log(this.anims.currentAnim.key);
        this.flipX = !this.flipX;
        // this.flipY = !this.flipY;
        //this.body.setRotation(360);
        this.setRotation(phaser.Math.DegToRad(this.flipX ? -90 : 0));
      }, this);

      this.setPosition(x, y);
      this.old = {x:0, y:0};
      this.old.x = x;
      this.old.y = y;

      scene.physics.add.existing(this);

      var c = phaser.Display.Color.RandomRGB(0,256);
      var r = phaser.Display.Color.ComponentToHex(c.r);
      var g = phaser.Display.Color.ComponentToHex(c.g);
      var b = phaser.Display.Color.ComponentToHex(c.b);
      //console.log('0x'+r+g+b);
      this.colour = '0x'+r+g+b;
      //this.setTint('0x'+r+'ff'+b);
      this.body.setDrag(1, 1);

      this.setBounce(0.7);
      this.setScale(10);//0.5);
      this.setOrigin(0.5, 0.5);
      var w = this.width*0.7;
      var h = this.height*0.7;
      this.body.setSize(w, h, true);
      this.body.setAllowGravity(false);
      this.body.setMass(10);
      this.body.allowRotation = false;
      this.body.offset = {
        x:(this.width - w)*0.5,
        y:(this.height - h)*0.5
      };

      // this.body.angularDrag = 4;
      // this.body.angularVelocity = 0;

      this.setCollideWorldBounds(true);
      this.body.stopVelocityOnCollide = false;

      this.moving = false;
      // scene.add.existing(this);
      console.log('all', this);

      scene.turtles.add(this);
      scene.physics.add.collider(this, scene.turtles);

      this.shell = scene.add.sprite(x,y, 'all')
      this.shell.setScale(10).setOrigin(0.5, 0.5);
      //.setTint(this.colour)

    }

    update (game) {
      if(this.body.position.x !== this.old.x || this.body.position.y !== this.old.y){
        this.old.x = this.body.position.x;
        this.old.y = this.body.position.y;
        //console.log('update');
      }
    }

    preUpdate (time, delta) {
      super.preUpdate(time, delta);
      this.directions();

      this.shell.x = this.x;
      this.shell.y = this.y;

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

      if(this.body.speed <= 5){
        this.body.stop();
        this.moving = false;
      }

      var direction = (this.direction % 2 === 0 ? 'vertical' : 'diagonal' );
      if(this.moving){
        this.anims.play(direction+'_hidden', true);
      }else{
        this.anims.play(direction+'_out', true);
      }

    }

    directions(){
      //console.log(this.direction);
      if(this.direction === 0 || this.direction === 7){
        this.setRotation(phaser.Math.DegToRad(0));
      }else if(this.direction === 2 || this.direction === 1){
        this.setRotation(phaser.Math.DegToRad(90));
      }else if(this.direction === 4 || this.direction === 3){
        this.setRotation(phaser.Math.DegToRad(180));
      }else if(this.direction === 6 || this.direction === 5){
        this.setRotation(phaser.Math.DegToRad(-90));
      }
    }
}

export default Turt;

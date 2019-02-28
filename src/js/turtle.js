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

      this.direction = 0;

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

      this.moving = false;

      this.setPosition(x, y);
      this.old = {x:0, y:0};
      this.old.x = x;
      this.old.y = y;

      //colours

      var c = phaser.Display.Color.RandomRGB(0,256);
      var r = phaser.Display.Color.ComponentToHex(c.r);
      var g = phaser.Display.Color.ComponentToHex(c.g);
      var b = phaser.Display.Color.ComponentToHex(c.b);
      //console.log('0x'+r+g+b);
      this.colour = '0x'+r+g+b;
      //this.setTint('0x'+r+'ff'+b);

      //physics
      scene.physics.add.existing(this);
      this.setBounce(0.7);
      this.setScale(10);//0.5);
      this.setOrigin(0.5, 0.5);
      var w = this.width*0.7;
      var h = this.height*0.7;
      this.body.setDrag(1, 1);
      this.body.setSize(w, h, true);
      this.body.setAllowGravity(false);
      this.body.setMass(10);
      this.body.allowRotation = false;
      this.body.offset = {
        x:(this.width - w)*0.5,
        y:(this.height - h)*0.5
      };
      this.setCollideWorldBounds(true);
      this.body.onWorldBounds = true;
      scene.physics.world.on('worldbounds', this.onWorldBounds);

      //add to physics group
      scene.turtles.add(this);
      //scene.physics.add.collider(this, scene.turtles);

      this.shell = scene.add.sprite(x,y, 'all')
      this.shell.setScale(10).setOrigin(0.5, 0.5);
      //.setTint(this.colour);

    }

    update (game) {
      if(this.body.position.x.toFixed(0) !== this.old.x || this.body.position.y.toFixed(0) !== this.old.y){
        this.old.x = this.body.position.x.toFixed(0);
        this.old.y = this.body.position.y.toFixed(0);
        // console.log('update', this.old);
        if(window.game.socket.connected){
          window.game.socket.emit('update', {
            id:this.id,
            x:this.old.x,
            y:this.old.y
          });
        }
      }
    }

    preUpdate (time, delta) {
      super.preUpdate(time, delta);
      this.directions();

      this.shell.x = this.x;
      this.shell.y = this.y;

      if(this.body.velocity !== 0){
        this.moving = true;
      }

      if(this.body.speed < 200){
        this.breakable = true;
      }else{
        this.breakable = false;
      }

      if(this.body && this.body.speed <= 5){
        this.moving = false;
      }

      var direction = (this.direction % 2 === 0 ? 'vertical' : 'diagonal' );
      if(this.moving){
        if(this.breakable){
          this.anims.play(direction+'_crawl', true);
        }else{
          this.anims.play(direction+'_hidden', true);
        }
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

    onWorldBounds(){
      console.log('onWorldBounds');
    }
}

export default Turt;

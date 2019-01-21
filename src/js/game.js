import phaser from 'phaser';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 432,
    height: 768,
    physics: {
      default: 'arcade',
      arcade: {
        debug: true
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
};

console.log(phaser);

import turtle_placeholder from 'assets/turtle_placeholder.png';
import bg from 'assets/uv-grid-diag.png';

// window.console.log(turtle_placeholder);
// var home = document.getElementById('home');
// home.src = turtle_placeholder;

var game = new phaser.Game(config);
//console.log(game);

function preload () {
  this.load.image('placeholder', turtle_placeholder);
  this.load.image('bg', bg);
  // this.load.spritesheet('dude',
  // 'assets/dude.png',
  // { frameWidth: 32, frameHeight: 48 }
  // );
}

function create () {
  window.console.log('create', this);
  //game.add.image(400, 300, 'placeholder');

  // var placeholder = this.add.sprite(50, 10, 'placeholder');
  // placeholder.width = 10;
  // placeholder.scaleY = 0.5;
  // placeholder.scaleX = 0.5;

  //placeholder.anchor.setTo(0.5, 0.5);
  //  placeholder.scale(0.5);
  // window.console.log(placeholder);
  // this.tweens.add({
  //   targets: placeholder,
  //   y: 450,
  //   duration: 2000,
  //   ease: 'Power2',
  //   yoyo: true,
  //   loop: -1
  // });
  // window.console.log(game.input.activePointer);

  // for (var y = 0; y < 4; y++) {
  //   for (var x = 0; x < 4; x++) {
      // this.add.image(1024 * x, 1024 * y, 'bg').setOrigin(0).setAlpha(0.75);
  //   }
  // }
  this.bottom = 0;
  this.top = 1024;
  this.physics.world.setBounds(this.bottom, this.bottom, this.top, this.top);
  this.add.image(0, 0, 'bg').setOrigin(0);

  var x = phaser.Math.Between(this.bottom, this.top);
  var y = phaser.Math.Between(this.bottom, this.top);
  game.group = this.add.group();
  var turtle = new Turt(
    this,
    0,//x,
    0//y
  );
  this.add.existing(turtle);
  this.cameras.main.startFollow(
    game.group.children.entries[game.group.children.entries.length-1],
    true, 0.08, 0.08
  );

  game.line = new phaser.Geom.Line(0,0,100,100);
  var graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });
  graphics.strokeLineShape(game.line);

  // var io = require('socket.io-client');
  // var socket = io.connect('http://192.168.45.75:4000');
  //
  // socket.on('connect', () => {
  //   console.log('test');
  //   socket.emit('started', {x,y});
  // });
  //
  // socket.on('update', (data) => {
  //   console.log(data);
  // });

}

function update(){
  if (game.input.activePointer.justDown){
    //var a = game.group.children.entries[game.group.children.entries.length-1];
    window.console.log(game.input.activePointer);
  }

  if(game.input.activePointer.isDown){
    //var line = new Phaser.Geom.Line();
    //console.log(game.line);
    //window.console.log(downX, downX);

    var a = game.group.children.entries[game.group.children.entries.length-1];
    //console.log(game.input.activePointer.position);
    //var angle = phaser.Math.Angle.Between( a.x, a.y, game.input.activePointer.position.x, game.input.activePointer.position.y );
    game.line = new phaser.Geom.Line(a.x, a.y, game.input.activePointer.position.x, game.input.activePointer.position.y);
    var graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });
    graphics.strokeLineShape(game.line);

    //var angle = phaser.Math.Angle.BetweenPoints(a, game.input.activePointer.position);
    //console.log( angle );
    //phaser.Geom.Line.SetToAngle(game.line, a.x, a.y, angle, 600);
    //a.angle = angle;
  }

  if (game.input.activePointer.justUp){
    var a = game.group.children.entries[game.group.children.entries.length-1];
    //a.setVelocityX(5);
    //a.setVelocity(190, 200);
    window.console.log(a);
  }

}

//class Turt extends phaser.GameObjects.Sprite {
class Turt extends phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
      super(scene, x, y);
      //this.physics.add.image(1024, 1024, 'placeholder');
      game.group.add(this);
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
      this.angularVelocity = 60;
      this.setCircle(this.height*0.35).setOrigin(0.5, 0.5);
      //this.setSize(48, 48, true);
      this.setBounce(0.8, 0.8);
      //this.setScale(0.5);
      this.setOrigin(0.5, 0.5);

      this.setCollideWorldBounds(true);

      this.setVelocity(0, 0);

      window.console.log(this);
    }

    preUpdate (time, delta) {
      super.preUpdate(time, delta);
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

import phaser from 'phaser';
import Turt from './turtle';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    antialias: true,
    scale:{
      width: 432,
      height: 768,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
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

//console.log(phaser);
import turtle_placeholder from 'assets/turtle_placeholder.png';
import bg from 'assets/uv-grid-diag.png';

var game = new phaser.Game(config);

function preload () {
  this.load.image('placeholder', turtle_placeholder);
  this.load.image('bg', bg);
  // this.load.spritesheet('dude',
  // 'assets/dude.png',
  // { frameWidth: 32, frameHeight: 48 }
  // );
}

function create () {

  // var placeholder = this.add.sprite(50, 10, 'placeholder');
  // placeholder.width = 10;
  // placeholder.scaleY = 0.5;
  // placeholder.scaleX = 0.5;

  // for (var y = 0; y < 4; y++) {
  //   for (var x = 0; x < 4; x++) {
      // this.add.image(1024 * x, 1024 * y, 'bg').setOrigin(0).setAlpha(0.75);
  //   }
  // }

  this.bottom = 0;
  this.top = 1050;//1024
  this.physics.world.setBounds(this.bottom, this.bottom, this.top, this.top);
  this.add.image(0, 0, 'bg').setOrigin(0);

  var x = phaser.Math.Between(this.bottom, this.top);
  var y = phaser.Math.Between(this.bottom, this.top);
  game.group = this.add.group();
  game.turtle = new Turt( this, x, y );
  game.turtle.alpha = 0.5;

  this.add.existing(game.turtle);
  this.cameras.main.startFollow(
    game.turtle, //game.group.children.entries[game.group.children.entries.length-1],
    true, 0.08, 0.08
  );

  game.line = new phaser.Geom.Line(0,0,100,100);
  game.graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });
  game.graphics.strokeLineShape(game.line);

  var io = require('socket.io-client');
  game.socket = io.connect('http://192.168.75.45:4000', {
    reconnection:false
  });

  console.log(game.socket);
  game.socket.on('connect', () => {
    game.socket.emit('start', {x,y});
  });

}

function update(){

  //game.turtle.update();

  if (game.input.activePointer.justDown){
    //var a = game.group.children.entries[game.group.children.entries.length-1];
    //window.console.log(game.input.activePointer);
  }

  if(game.input.activePointer.isDown){
    //var a = game.group.children.entries[game.group.children.entries.length-1];
    //if(!a.body.isMoving){
      game.graphics.clear();
      game.graphics.strokeLineShape(game.line);
      game.line.setTo(
        game.turtle.x,
        game.turtle.y,
        game.input.activePointer.worldX,
        game.input.activePointer.worldY
      );
    //}
  }

  if (game.input.activePointer.justUp){
    //var a = game.group.children.entries[game.group.children.entries.length-1];

    //if(!a.body.isMoving){
      var angle = phaser.Math.Angle.Between(
        game.input.activePointer.worldX,
        game.input.activePointer.worldY,
        game.turtle.x,
        game.turtle.y
      );
      //window.console.log(phaser.Geom.Line.Length(game.line));
      var velocity = new phaser.Math.Vector2();
      this.physics.velocityFromRotation(angle, 200, velocity);
      game.turtle.setVelocity(velocity.x, velocity.y);
    //}
  }

  if(game.socket.connected){
    game.socket.on('newPlayer', (id) => {
      game.turtle.id = id;
      game.turtle.alpha = 1;
      window.console.log(game);
    });

    game.socket.on('update', (data) => {
      console.log(data);
    });

  }

}

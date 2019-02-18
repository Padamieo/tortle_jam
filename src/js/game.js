import phaser from 'phaser';
import Turt from './turtle';
import Fruit from './fruit';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    antialias: true,
    pixelArt: true,
    zoom: 1,
    scale:{
      width: 1024, //window.innerWidth, //432,
      height: 1024, //window.innerHeight, //768,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    queue: true,
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
import fruits from 'assets/fruit.png';
import tiles from 'assets/Tileset_BW.png';

var game = new phaser.Game(config);
// game.setGameSize(600,600);

function preload () {
  this.load.image('placeholder', turtle_placeholder);
  this.load.image('bg', bg);

  // this.load.image('tiles', tiles);

  this.load.spritesheet('tiles',
    tiles,
    { frameWidth: 24, frameHeight: 24 }
  );

  this.load.spritesheet('fruits',
    fruits,
    { frameWidth: 16, frameHeight: 16 }
  );
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
  this.top = 1024;
  this.physics.world.setBounds(this.bottom, this.bottom, this.top, this.top);
  this.add.image(0, 0, 'bg').setOrigin(0);

  this.add.image(0, 0, 'tiles').setOrigin(0).setScale(25).setTint(0x009955);
  //.setRotation(-Math.PI * 0.25);

  //this.add.tileSprite(0, 0, 100, 100, 'tiles').setOrigin(0).setScale(25);

  var x = phaser.Math.Between(this.bottom, this.top);
  var y = phaser.Math.Between(this.bottom, this.top);

  game.turtles = this.add.group();
  this.fruits = this.add.group();

  game.turtle = new Turt( this, x, y );
  game.turtle.alpha = 0.5;
  //this.add.existing(game.turtle);

  game.turtles.add(game.turtle);
  this.physics.add.collider(game.turtle, game.turtles);

  this.camera = this.cameras.main.startFollow(
    game.turtle, //game.turtles.children.entries[game.turtles.children.entries.length-1],
    true, 0.08, 0.08
  );

  game.line = new phaser.Geom.Line(0,0,100,100);
  game.graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });
  game.graphics.strokeLineShape(game.line);

  var t = new Turt( this, phaser.Math.Between(this.bottom, this.top), phaser.Math.Between(this.bottom, this.top) );
  game.turtles.add(t);
  this.physics.add.collider(t, game.turtles);

  new Fruit( this, phaser.Math.Between(this.bottom, this.top), phaser.Math.Between(this.bottom, this.top) );
  new Fruit( this, phaser.Math.Between(this.bottom, this.top), phaser.Math.Between(this.bottom, this.top) );
  new Fruit( this, phaser.Math.Between(this.bottom, this.top), phaser.Math.Between(this.bottom, this.top) );
  new Fruit( this, phaser.Math.Between(this.bottom, this.top), phaser.Math.Between(this.bottom, this.top) );

  this.physics.add.overlap(this.fruits, game.turtle, (x)=> {
    console.log('over', x);
    x.collected();
  });

  var io = require('socket.io-client');
  game.socket = io.connect('http://192.168.1.104:4000', {
    reconnection:false
  });

  game.socket.on('connect', () => {
    game.socket.emit('start', {x,y});
  });

  this.keys = this.input.keyboard.addKeys('A,D,S,W');
}

function update(){
  //game.turtle.update(game);

  //var a = game.turtles.children.entries[game.turtles.children.entries.length-1];

  // if(this.keys.A.isDown){
  //   game.turtle.setVelocity(-100, 0);
  // }
  // if(this.keys.W.isDown){
  //   game.turtle.setVelocity(0, -100);
  // }
  if(this.keys.S.isDown){
    //console.log(game.turtle);
    //console.log(game.input);
    this.camera.zoom = 0.5;
  }

  if(game.turtle.moving === false){
    if(game.input.activePointer.isDown){
      game.graphics.clear();
      game.graphics.strokeLineShape(game.line);
      game.line.setTo(
        game.turtle.x,
        game.turtle.y,
        game.input.activePointer.worldX,
        game.input.activePointer.worldY
      );
      game.turtle.d = true;
    }else{
      game.graphics.clear();
      if(game.turtle.d){
        game.turtle.d = false;
        var angle = phaser.Math.Angle.Between(
          game.input.activePointer.worldX,
          game.input.activePointer.worldY,
          game.turtle.x,
          game.turtle.y
        );
        var velocity = new phaser.Math.Vector2();
        this.physics.velocityFromRotation(angle, 500, velocity);
        game.turtle.setVelocity(velocity.x, velocity.y);
      }
    }
  }else{
    game.graphics.clear();
  }

  if(game.socket.connected){
    game.socket.on('newPlayer', (id) => {
      game.turtle.id = id;
      game.turtle.alpha = 1;
      //window.console.log(game);
    });
    game.socket.on('update', (data) => {
      console.log(data);
    });

    game.socket.on('position', (position) => {
      console.log('create enemy');
      console.log(game.turtles);
      var tortle = new Turt( this, position.x, position.y);
      game.turtles.add(tortle);
      //this.physics.add.collider(game.turtles, game.turtle);
      console.log(game.turtles);
      // this.add.sprite(position.x, position.y, 'placeholder');
    })
  }

}

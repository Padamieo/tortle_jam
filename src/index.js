import './index.css';

import phaser from 'phaser';
import GameScene from './js/game';
// import Turt from './js/turtle';
// import Fruit from './js/fruit';

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
    scene: [
      GameScene
    ]
};

//console.log(phaser);
// import turtle_placeholder from 'assets/turtle_placeholder.png';
// import turtle from 'assets/turtle.png';
// import bg from 'assets/uv-grid-diag.png';
// import fruits from 'assets/fruit.png';
// import tiles from 'assets/Tileset_BW.png';

window.game = new phaser.Game(config);
// game.setGameSize(600,600);

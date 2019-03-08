import './index.css';

import phaser from 'phaser';
import GameScene from './js/game';

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
    fps: {
      target: 1,
    },
    queue: true,
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
        fps: 10,
      }
    },
    scene: [
      GameScene
    ]
};

window.game = new phaser.Game(config);
// game.setGameSize(600,600);

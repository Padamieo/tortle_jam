export default function setupAnimations(scene) {

  scene.anims.create({
    key: 'shell',
    frames: [ { key: 'turtle', frame: 0 } ],
    frameRate: 1,
  });

  scene.anims.create({
    key: 'vertical_out',
    frames: [ { key: 'turtle', frame: 1 } ],
    frameRate: 1,
  });

  scene.anims.create({
    key: 'vertical_crawl',
    frames: [ { key: 'turtle', frame: 2 } ],
    frameRate: 2,
    repeat: -1,
  });

  scene.anims.create({
    key: 'diagonal_out',
    frames: [ { key: 'turtle', frame: 3 } ],
    frameRate: 1,
  });

  scene.anims.create({
    key: 'diagonal_crawl',
    frames: [ { key: 'turtle', frame: 4 } ],
    frameRate: 2,
    repeat: -1,
  });

  scene.anims.create({
    key: 'diagonal_hidden',
    frames: [ { key: 'turtle', frame: 5 } ],
    frameRate: 1,
  });

  scene.anims.create({
    key: 'vertical_hidden',
    frames: [ { key: 'turtle', frame: 6 } ],
    frameRate: 1,
  });

}

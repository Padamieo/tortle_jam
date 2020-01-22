export default function setupAnimations(scene) {

	scene.anims.create({
		key: 'shell',
		frames: [ { key: 'all', frame: 0 } ],
		frameRate: 1,
	});

	scene.anims.create({
		key: 'vertical_out',
		frames: [ { key: 'all', frame: 3 } ],
		frameRate: 1,
	});

	scene.anims.create({
		key: 'vertical_crawl',
		frames: [ { key: 'all', frame: 4 } ],
		frameRate: 2,
		repeat: -1,
	});

	scene.anims.create({
		key: 'diagonal_out',
		frames: [ { key: 'all', frame: 5 } ],
		frameRate: 1,
	});

	scene.anims.create({
		key: 'diagonal_crawl',
		frames: [ { key: 'all', frame: 6 } ],
		frameRate: 2,
		repeat: -1,
	});

	scene.anims.create({
		key: 'diagonal_hidden',
		frames: [ { key: 'all', frame: 7 } ],
		frameRate: 1,
	});

	scene.anims.create({
		key: 'vertical_hidden',
		frames: [ { key: 'all', frame: 8 } ],
		frameRate: 1,
	});

}

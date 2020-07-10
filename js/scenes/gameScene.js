import Ecosystem from "../objects/ecosystem.js"
import Player from "../objects/player.js"
import Collectible from "../objects/collectible.js";
import { CONSTANTS } from "../constants.js";

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init() {
    this.stomach_contents = CONSTANTS.stomach_contents_starting
  }

  preload() {
    this.load.image('sky', '../../assets/sky.png');
    this.load.image('star', '../../assets/star.png');
    this.load.image('ground', '../../assets/platform.png');
    this.load.spritesheet('dude', '../../assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    this.add.image(400, 300, 'sky');

    this.platforms = this.physics.add.staticGroup();
    this.platforms
      .create(400, 568, 'ground')
      .setScale(2)
      .refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    this.player = new Player({ scene: this, opt: {} });
    this.ecosystem = new Ecosystem({
      scene: this,
      opt: {}
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.collider(this.player.player, this.platforms);
  }

  update() {
    this.player.update();
    //this.stomachContentsText.setText(this.stomach_contents);
    this.ecosystem.update();
  }
}



export default GameScene;

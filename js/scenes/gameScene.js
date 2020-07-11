import Ecosystem from "../objects/ecosystem.js"
import Player from "../objects/player.js"
import Collectible from "../objects/collectible.js";
import Villager from "../objects/villager.js"
import WorldMap from "../objects/worldMap.js"

import { CONSTANTS } from "../constants.js";
import { HITBOXES } from "../hitboxes.js";

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init() {
    this.stomach_contents = CONSTANTS.STOMACH_CONTENTS_STARTING
  }

  preload() {
    for (const filename in HITBOXES) {
      if (HITBOXES.hasOwnProperty(filename)) {
        this.load.image(filename, '../../assets/' + filename);
        console.log(filename);
      }
    }
    this.load.image('sky', '../../assets/sky.png');
    this.load.image('star', '../../assets/star.png');
    this.load.image('ground', '../../assets/platform.png');
    this.load.spritesheet('dude', '../../assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    this.add.image(400, 300, 'sky');
    this.physics.world.setBounds(0, 0, CONSTANTS.WORLD_WIDTH, CONSTANTS.WORLD_HEIGHT);

    this.platforms = this.physics.add.staticGroup();
    this.platforms
      .create(400, 568, 'ground')
      .setScale(2)
      .refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    this.player = new Player({ scene: this, opt: {} });
    this.villager = new Villager({ scene: this, opt: {} });
    this.collectible = new Collectible({ scene: this, x: 50, y: 50, texture: 'star', frame: {}});
    this.ecosystem = new Ecosystem({
      scene: this,
      opt: {}
    });
    this.worldMap = new WorldMap({
      scene: this,
      opt: {}
    });

    this.physics.add.collider(this.player.player, this.worldMap.getObstacles());

    //Create camera and set to follow player
    this.cameras.main.setBounds(0, 0, CONSTANTS.WORLD_WIDTH, CONSTANTS.WORLD_HEIGHT);
    this.cameras.main.startFollow(this.player.player);
  }

  update() {
    this.player.update();
    this.villager.update();
    //this.stomachContentsText.setText(this.stomach_contents);
    this.ecosystem.update();
  }
}



export default GameScene;

import Ecosystem from "../objects/ecosystem.js"
import Player from "../objects/player.js"
import Collectible from "../objects/collectible.js";
import WorldMap from "../objects/worldMap.js"

import { CONSTANTS } from "../constants.js";
import { HITBOXES } from "../hitboxes.js";

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    for (const filename in HITBOXES) {
      if (HITBOXES.hasOwnProperty(filename)) {
        this.load.image(filename, '../../assets/' + filename);
      }
    }
    this.load.image('apple', '../../assets/41-small.png');
    this.load.spritesheet('dude', '../../assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    this.physics.world.setBounds(0, 0, CONSTANTS.WORLD_WIDTH, CONSTANTS.WORLD_HEIGHT);

    this.player = new Player({ scene: this, opt: {} });
    this.collectible = new Collectible({ scene: this, x: 50, y: 50, texture: 'star', frame: {}});
    this.ecosystem = new Ecosystem({
      scene: this,
      opt: {}
    });
    this.worldMap = new WorldMap({
      scene: this,
      opt: {}
    });

    this.physics.add.collider(this.player.physicsBody, this.worldMap.getObstacles());

    //Create camera and set to follow player
    this.cameras.main.setBounds(0, 0, CONSTANTS.WORLD_WIDTH, CONSTANTS.WORLD_HEIGHT);
    this.cameras.main.startFollow(this.player.physicsBody);
    this.cameras.main.setBackgroundColor('rgb(238, 240, 246)');
  }

  update() {
    this.player.update();
    this.ecosystem.update();
  }
}



export default GameScene;

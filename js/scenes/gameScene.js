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
      }
    }
    this.load.image('apple', '../../assets/41-small.png');

    //this.load.multiatlas('princessIdle', '../../assets/Princess/PrincessIdle.json', '../../assets');
    //this.load.multiatlas('princessAtlas', '../../assets/Princess.json', '../../assets/Princess');

    this.load.spritesheet('princessIdle', '../../assets/Princess/princessIdle.png', { frameWidth: 111, frameHeight: 104 });
    this.load.spritesheet('princessRun', '../../assets/Princess/princessRun.png', { frameWidth: 111, frameHeight: 104});
    this.load.image('princess', '../../assets/Princess/princess.png');
  }

  create() {
    this.physics.world.setBounds(0, 0, CONSTANTS.WORLD_WIDTH, CONSTANTS.WORLD_HEIGHT);

    this.player = new Player({ scene: this, opt: {} });
    
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
    this.cameras.main.setBackgroundColor('rgb(248, 250, 252)');
  }

  update() {
    this.player.update();
    //this.stomachContentsText.setText(this.stomach_contents);
    this.ecosystem.update();
  }
}



export default GameScene;

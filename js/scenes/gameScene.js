import Ecosystem from "../objects/ecosystem.js"
import Player from "../objects/player.js"
import Collectible from "../objects/collectible.js";
import WorldMap from "../objects/worldMap.js"

import { CONSTANTS } from "../constants.js";
import { HITBOXES } from "../hitboxes.js";

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.gameOver = false;
  }

  preload() {
    for (const filename in HITBOXES) {
      if (HITBOXES.hasOwnProperty(filename)) {
        this.load.image(filename, '../../assets/' + filename);
      }
    }
    this.load.image('villager', '../../assets/star.png');
    this.load.image('apple', '../../assets/41-small.png');

    //this.load.multiatlas('princessIdle', '../../assets/Princess/PrincessIdle.json', '../../assets');
    //this.load.multiatlas('princessAtlas', '../../assets/Princess.json', '../../assets/Princess');

    //Princess Animations
	  this.load.spritesheet('princessIdle', '../../assets/Princess/princessIdle.png', { frameWidth: 111, frameHeight: 104 });
    this.load.spritesheet('princessRun', '../../assets/Princess/princessRun.png', { frameWidth: 111, frameHeight: 104});
    this.load.image('princess', '../../assets/Princess/princess.png');

    //Wolf Animations
    this.load.spritesheet('wolfRun', '../../assets/Wolf/wolfRun.png', { frameWidth: 111, frameHeight: 104});
    this.load.spritesheet('wolfAttack', '../../assets/Wolf/wolfRun.png', { frameWidth: 111, frameHeight: 104});

  }

  create() {
    this.physics.world.setBounds(0, 0, CONSTANTS.WORLD_WIDTH, CONSTANTS.WORLD_HEIGHT);

    this.player = new Player({camera: this.cameras.main, scene: this, opt: {} });
    
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
    this.cameras.main.startFollow(this.player.physicsBody, false, 0.4, 0.4);
    this.cameras.main.setBackgroundColor('rgb(238, 240, 246)');
    console.log(this.cameras.main);
  }

  update() {
    this.player.update();
    this.ecosystem.update();

    if (this.gameOver) {
      this.scene.start("GameOverScene");
    }
  }
}



export default GameScene;

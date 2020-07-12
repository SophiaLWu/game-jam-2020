import Ecosystem from "../objects/ecosystem.js"
import Player from "../objects/player.js"
import Collectible from "../objects/collectible.js";
import WorldMap from "../objects/worldMap.js"
import Overlay from "../objects/overlay.js"
import Game from "../main.js"

import { CONSTANTS } from "../constants.js";
import { HITBOXES } from "../hitboxes.js";

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    for (const filename in HITBOXES) {
      if (HITBOXES.hasOwnProperty(filename)) {
        this.load.image(filename, '../../assets/' + filename);
      }
    }
    this.load.image('villager', '../../assets/star.png');
    this.load.image('apple', '../../assets/41-small.png');
    this.load.image('heart', '../../assets/heart2.png');

    //this.load.multiatlas('princessIdle', '../../assets/Princess/PrincessIdle.json', '../../assets');
    //this.load.multiatlas('princessAtlas', '../../assets/Princess.json', '../../assets/Princess');

    //Princess Animations
	  this.load.spritesheet('princessIdle', '../../assets/Princess/princessIdle.png', { frameWidth: 111, frameHeight: 104 });
    this.load.spritesheet('princessRun', '../../assets/Princess/princessRun.png', { frameWidth: 111, frameHeight: 104});
    this.load.image('princess', '../../assets/Princess/princess.png');

    //Wolf Animations
    this.load.spritesheet('wolfRun', '../../assets/Wolf/wolfRun.png', { frameWidth: 111, frameHeight: 104});
    this.load.spritesheet('wolfAttack', '../../assets/Wolf/wolfRun.png', { frameWidth: 111, frameHeight: 104});
    this.load.atlas('wolfToPrincess', '../../assets/WolfToPrincess.png', '../../assets/WolfToPrincess.json');

    //Villager Animations    
    this.load.atlas('maleVillager1', '../../assets/Villagers/MaleVillager1.png', '../../assets/Villagers/MaleVillager1.json');
    this.load.atlas('angryMaleVillager1', '../../assets/Villagers/AngryMaleVillager1.png', '../../assets/Villagers/AngryMaleVillager1.json');

    //Angry Villager Animations
    this.load.atlas('military1', '../../assets/Villagers/Military1.png', '../../assets/Villagers/Military1.json');

    // Sound FX
    this.load.audio('transformSound', '../../assets/sound/transform_Sound.wav');
    this.load.audio('eatSound', '../../assets/sound/eat.mp3');
    this.load.audio('eatVillagerSound', '../../assets/sound/eat_villager.mp3');
    this.load.audio('humanFootstepsSnowSound', '../../assets/sound/human_footsteps_snow.mp3');
    this.load.audio('villagerShovelSound', '../../assets/sound/villager_shovel.mp3');
  }

  create() {
    this.isPlayerDead = false;
    this.gameOver = false;
    this.timeStarted = Date.now();
    this.physics.world.setBounds(0, 0, CONSTANTS.WORLD_WIDTH, CONSTANTS.WORLD_HEIGHT);

    this.player = new Player({camera: this.cameras.main, scene: this, opt: {} });
    this.redOverlay = new Overlay({scene: this});
    
    this.worldMap = new WorldMap({
      scene: this,
      opt: {}
    });
    this.ecosystem = new Ecosystem({
      scene: this,
      opt: {}
    });
    const collider1 = this.physics.add.collider(this.player.physicsBody, this.worldMap.getObstacles());
    const collider2 = this.physics.add.collider(this.player.physicsBody, this.worldMap.getTownObstacles());
    this.player.setCollisions = (enable) => {
      collider1.active = enable;
      collider2.active = enable;
      this.redOverlay.setShow(!enable);
    };

    //Create camera and set to follow player
    this.cameras.main.setBounds(0, 0, CONSTANTS.WORLD_WIDTH, CONSTANTS.WORLD_HEIGHT);
    this.cameras.main.startFollow(this.player.physicsBody, false, 0.4, 0.4);
    this.cameras.main.setBackgroundColor('rgb(238, 240, 246)');
  }

  update() {
    this.input.keyboard.once('keydown_M', function(){
      console.log("toggle")
      Game.toggleSound();
    }, this);

    if (this.gameOver) {
      this.sound.stopAll();
      this.data = {
        timeStarted: this.timeStarted,
        foodEaten: this.player.foodEaten,
        villagersEaten: this.player.villagersEaten
      }
      this.gameOver = false;
      this.scene.manager.start('GameOverScene', this.data);
      this.scene.manager.stop('GameScene');
    } else {
      this.player.update();
      this.redOverlay.update();
      if (!this.isPlayerDead) {
        this.ecosystem.update();
      }
    }
  }
}



export default GameScene;

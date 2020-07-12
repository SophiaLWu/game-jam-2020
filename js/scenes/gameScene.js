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
        this.load.image(filename, 'https://sophialwu.github.io/game-jam-2020/assets/' + filename);
      }
    }
    this.load.image('villager', 'https://sophialwu.github.io/game-jam-2020/assets/star.png');
    this.load.image('apple', 'https://sophialwu.github.io/game-jam-2020/assets/41-small.png');
    this.load.image('heart', 'https://sophialwu.github.io/game-jam-2020/assets/heart2.png');

    //this.load.multiatlas('princessIdle', 'https://sophialwu.github.io/game-jam-2020/assets/Princess/PrincessIdle.json', 'https://sophialwu.github.io/game-jam-2020/assets');
    //this.load.multiatlas('princessAtlas', 'https://sophialwu.github.io/game-jam-2020/assets/Princess.json', 'https://sophialwu.github.io/game-jam-2020/assets/Princess');

    //Princess Animations
	  this.load.spritesheet('princessIdle', 'https://sophialwu.github.io/game-jam-2020/assets/Princess/princessIdle.png', { frameWidth: 111, frameHeight: 104 });
    this.load.spritesheet('princessRun', 'https://sophialwu.github.io/game-jam-2020/assets/Princess/princessRun.png', { frameWidth: 111, frameHeight: 104});
    this.load.image('princess', 'https://sophialwu.github.io/game-jam-2020/assets/Princess/princess.png');

    //Wolf Animations
    this.load.spritesheet('wolfRun', 'https://sophialwu.github.io/game-jam-2020/assets/Wolf/wolfRun.png', { frameWidth: 111, frameHeight: 104});
    this.load.atlas('wolfAttack', 'https://sophialwu.github.io/game-jam-2020/assets/Wolf/wolfAttack.png', 'https://sophialwu.github.io/game-jam-2020/assets/Wolf/wolfAttack.json');
    this.load.atlas('princessToWolf', 'https://sophialwu.github.io/game-jam-2020/assets/PtoW.png', 'https://sophialwu.github.io/game-jam-2020/assets/PtoW.json');

    //Villager Animations    
    this.load.atlas('maleVillager1', 'https://sophialwu.github.io/game-jam-2020/assets/Villagers/MaleVillager1.png', 'https://sophialwu.github.io/game-jam-2020/assets/Villagers/MaleVillager1.json');
    this.load.atlas('angryMaleVillager1', 'https://sophialwu.github.io/game-jam-2020/assets/Villagers/AngryMaleVillager1.png', 'https://sophialwu.github.io/game-jam-2020/assets/Villagers/AngryMaleVillager1.json');

    //Angry Villager Animations
    this.load.atlas('military1', 'https://sophialwu.github.io/game-jam-2020/assets/Villagers/Military1.png', 'https://sophialwu.github.io/game-jam-2020/assets/Villagers/Military1.json');

    // Sound FX
    this.load.audio('transformSound', 'https://sophialwu.github.io/game-jam-2020/assets/sound/Transform_Sound.wav');
    this.load.audio('wolfHowl', 'https://sophialwu.github.io/game-jam-2020/assets/sound/fadewolf.mp3');
    this.load.audio('eatSound', 'https://sophialwu.github.io/game-jam-2020/assets/sound/eat.mp3');
    this.load.audio('eatVillagerSound', 'https://sophialwu.github.io/game-jam-2020/assets/sound/eat_villager.mp3');
    this.load.audio('humanFootstepsSnowSound', 'https://sophialwu.github.io/game-jam-2020/assets/sound/human_footsteps_snow.mp3');
    this.load.audio('villagerShovelSound', 'https://sophialwu.github.io/game-jam-2020/assets/sound/villager_shovel.mp3');
    this.load.audio('doorSound', 'https://sophialwu.github.io/game-jam-2020/assets/sound/door.mp3');
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

    this.sound.add('doorSound', { volume: 0.4, loop: false }).play();
  }

  update() {
    this.input.keyboard.once('keydown_M', function(){
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

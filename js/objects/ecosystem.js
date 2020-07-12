import { manhattanDistance } from "../utils.js"
import { CONSTANTS, MoodEnum } from "../constants.js"
import Food from "./food.js";
import Villager from "./villager.js";

class Ecosystem extends Phaser.GameObjects.Graphics {
  constructor(params) {
    super(params.scene, params.opt);
    this.scene = params.scene;
    this.physics = params.scene.physics;
    this.player = params.scene.player;
    this.startingFoodAmount = CONSTANTS.STARTING_FOOD_AMOUNT;
    this.startingVillagerAmount = CONSTANTS.STARTING_VILLAGER_AMOUNT;

    this.villagerOverlapTriggered = false
    this.foodOverlapTriggered = false

    this.villagers = [];

    this.foodBodies = this.physics.add.group();
    this.villagerBodies = this.physics.add.group();
    
    let {lastX, lastY} = {lastX: 0, lastY: 0};
    for (let i = 0; i < this.startingFoodAmount; i++) {
      const {x, y} = this.getRandomSpawnLocation(lastX, lastY);
      lastX = x;
      lastY = y;
      this.createFood(x,y);
    }

    this.physics.add.collider(this.player.physicsBody, this.foodBodies, this.pickUpFood, null, this );

    for (let i = 0; i < this.startingVillagerAmount; i++) {
      const {x, y} = this.getRandomSpawnLocation(lastX, lastY);
      lastX = x;
      lastY = y;
      this.createVillager(x, y);
    }

    this.physics.add.collider(this.villagerBodies, this.foodBodies, this.villagerEatsFood, null, this );

    this.physics.add.collider(this.player.physicsBody, this.villagerBodies, this.collideIntoVillager, null, this );

    this.physics.add.collider(this.villagerBodies, this.scene.worldMap.getObstacles());
    this.physics.add.collider(this.villagerBodies, this.scene.worldMap.getTownObstacles(), this.villagerCollideIntoTown, null, this);

    this.physics.add.overlap(this.foodBodies, this.scene.worldMap.getObstacles(), this.replaceFoodLocation, null, this);
    this.physics.add.overlap(this.foodBodies, this.scene.worldMap.getTownObstacles(), this.replaceFoodLocation, null, this);

    this.physics.add.collider(this.villagerBodies, this.villagerBodies);

    //Call villager animations function
    Villager.buildVillagerAnimations(this.scene);

    this.villagerShovelSound = this.scene.sound.add('villagerShovelSound', { volume: 0.3, loop: false });
  }

  createFood(x, y) {
    const food = new Food({
      scene: this.scene,
      x: x,
      y: y,
      texture: 'apple',
      frame: {}
    });

    this.foodBodies.add(food.physicsBody); // AndrewC: can't add Food objects to groups, only physics bodies.
  }

  createVillager(x, y, mood=MoodEnum.NORMAL) {
    const villager = new Villager({
      scene: this.scene,
      opt: {
        initialX: x,
        initialY: y,
        foods: this.foodBodies,
        mood: mood
      },
    });
    
    this.villagers.push(villager);
    this.villagerBodies.add(villager.physicsBody);
  }

  update() {
    this.villagers.forEach(function(villager) {
      villager.foods = this.foodBodies;
      villager.update();
    }.bind(this));
  }

  getRandomSpawnLocation(farX, farY) {
    let x = farX || 0;
    let y = farY || 0;
    let withinBounds = true; //x and y are 0 the first time through, so initially set this to true
    const minX = CONSTANTS.FOOD_BOUND_BORDER;
    const minY = CONSTANTS.FOOD_BOUND_BORDER;
    const maxWidth = CONSTANTS.WORLD_WIDTH - (2 * CONSTANTS.FOOD_BOUND_BORDER);
    const maxHeight = CONSTANTS.WORLD_HEIGHT - (2 * CONSTANTS.FOOD_BOUND_BORDER);

    let distance = -1

    while (manhattanDistance(x, y, farX, farY) < CONSTANTS.MIN_SPAWN_DISTANCE) {
      x = minX + Math.floor(Math.random() * maxWidth);
      y = minY + Math.floor(Math.random() * maxHeight);
    }
    return { x, y };
  }

  pickUpFood(playerBody, foodBody) {
    foodBody.getFood().onCollision();
    this.player.heal(1);
    this.player.eatFood();

    const {x, y} = this.getRandomSpawnLocation(playerBody.x, playerBody.y);
    this.createFood(x, y);
  }

  villagerEatsFood(villagerBody, foodBody) {
    const {x, y} = this.getRandomSpawnLocation(villagerBody.x, villagerBody.y);
    this.createFood(x, y);
    foodBody.getFood().onCollision();
  }

  collideIntoVillager(playerBody, villagerBody) {
    let villager = villagerBody.getVillager();

    if (this.player.isWerewolf) {
      let sfx = this.scene.sound.add('eatVillagerSound', { volume: 0.4, loop: false });
      sfx.play();

      villager.kill(); 
      this.player.villagersEaten += 1;

      // Make villagers faster over time
      if (this.player.villagersEaten % 2 == 0){
        this.villagers.forEach(function(villager) {
          if (villager.isAngry()) {
            villager.velocity += 60
          }
        }.bind(this));
      }

      this.player.turnHuman();
      Villager.scareOtherVillagers(playerBody.x, playerBody.y);
      this.spawnAngryVillagers();
    } else if (villager.isAngry()) {
      if (!this.villagerShovelSound.isPlaying) this.villagerShovelSound.play();
      this.player.damage(CONSTANTS.VILLAGER_DAMAGE_TO_PLAYER);
    }
  }

  villagerCollideIntoTown(villagerBody, _townBody) {
    let villager = villagerBody.getVillager();

    if (villager.isScared()) {
      villager.anger();
      var newVillagers = 0;
      while (newVillagers < CONSTANTS.VILLAGER_SPAWN_COUNT_UPON_SCARED_VILLAGER_RETURNING) {
        this.createVillager(CONSTANTS.VILLAGE_X, CONSTANTS.VILLAGE_Y, MoodEnum.NORMAL);
        newVillagers++;
      }
    }
  }

  spawnAngryVillagers() {
    var newVillagers = 0;
    while (newVillagers < CONSTANTS.VILLAGER_SPAWN_COUNT_UPON_DEATH) {
      this.createVillager(CONSTANTS.VILLAGE_X, CONSTANTS.VILLAGE_Y, MoodEnum.ANGRY);
      newVillagers++;
    }
  }

  replaceFoodLocation(foodBody, _obstacleBody) {
    const {x, y} = this.getRandomSpawnLocation(0, 0);
    foodBody.getFood().setLocation(x, y);
  }
}

export default Ecosystem;
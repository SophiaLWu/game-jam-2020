import { manhattanDistance } from "../utils.js"
import { CONSTANTS } from "../constants.js"
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

  createVillager(x, y) {
    const villager = new Villager({
      scene: this.scene,
      opt: {
        initialX: x,
        initialY: y,
        foods: this.foodBodies
      }
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

  pickUpFood(playerBody, foodBody) { //AndrewC: food here is physics body only, can't use methods from Food (or Collectible) classes.
    foodBody.getFood().onCollision();
    this.player.heal(1); // AndrewC: this shit only works because there's only one player
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
      this.player.turnHuman();
      villager.kill(); 

      var newVillagers = 0;
      var lastX = 0;
      var lastY = 0;
      while (newVillagers <= CONSTANTS.VILLAGER_SPAWN_COUNT_UPON_DEATH) {
        const {x, y} = this.getRandomSpawnLocation(lastX, lastY);
        lastX = x;
        lastY = y;
        this.createVillager(x, y);
        newVillagers++;
      }
    } else if (villager.isAngry()) {
      this.player.damage(1);
    }
  }
}

export default Ecosystem;
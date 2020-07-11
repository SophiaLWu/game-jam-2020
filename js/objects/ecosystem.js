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
    const minDistance = 80;
    for (let i = 0; i < this.startingFoodAmount; i++) {
      const {x, y} = this.getRandomSpawnLocation(lastX, lastY, minDistance);
      lastX = x;
      lastY = y;
      this.createFood(x,y);
    }

    this.physics.add.collider(this.player.player, this.foodBodies, this.pickUpFood, null, this );

    for (let i = 0; i < this.startingVillagerAmount; i++){
      const {x, y} = this.getRandomSpawnLocation(lastX, lastY, minDistance);
      lastX = x;
      lastY = y;
      this.createVillager(x, y);
    }

    this.physics.add.collider(this.villagerBodies, this.foodBodies, this.villagerEatsFood, null, this );


    // this.stomachContentsText = this.add.text(100, 100, this.stomach_contents, { fontSize: '32px', fill: '#fff' });
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

  getRandomSpawnLocation(farX, farY, minDistance) {
    // Eventually randomly generate points around the globe
    return {
      x : Math.floor(Math.random() * 800),
      y : Math.floor(Math.random() * 600),
    };
  }

  pickUpFood(player, foodBody) { //AndrewC: food here is physics body only, can't use methods from Food (or Collectible) classes.
    foodBody.getFood().onCollision();
    this.scene.stomach_contents = Math.min(this.scene.stomach_contents + 10, CONSTANTS.STOMACH_CONTENTS_MAX);
    this.player.heal(1); // AndrewC: this shit only works because there's only one player
    this.player.eat();

    const {x, y} = this.getRandomSpawnLocation();
    this.createFood(x, y);
  }

  villagerEatsFood(villager, foodBody) {
    const {x, y} = this.getRandomSpawnLocation();
    this.createFood(x, y);
    foodBody.getFood().onCollision();
  }

  collideIntoVillager(villager) { // AndrewC: this needs to be re-written to use colliders
    if(this.villagerOverlapTriggered && this.villagerOverlapTrigger){
      this.physics.world.removeCollider(this.villagerOverlapTrigger);
      return;
    };

    this.villagerOverlapTriggered = true;

    if (villager.isAngry()) {
      this.player.onCollision();
    }

    if (this.player.isWerewolf) {
      villager.kill(); 

      var newVillagers = 0;
      while(newVillagers <= CONSTANTS.VILLAGER_SPAWN_COUNT_UPON_DEATH) {
        const {x, y} = this.getRandomSpawnLocation();
        this.createVillager(x, y);
        newVillagers++;
     }
    }
  }
}

export default Ecosystem;
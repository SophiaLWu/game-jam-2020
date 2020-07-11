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

    this.foods = [] 
    for (let i = 0; i < this.startingFoodAmount; i++){
      const {x, y} = this.getRandomSpawnLocation();
      this.foods.push(this.createFood(x, y));
    }

    this.villagers = []
    for (let i = 0; i < this.startingVillagerAmount; i++){
      const {x, y} = this.getRandomSpawnLocation();
      this.villagers.push(this.createVillager(x, y));
    }



    // this.stomachContentsText = this.add.text(100, 100, this.stomach_contents, { fontSize: '32px', fill: '#fff' });
  }

  createFood(x, y) {
    const food = new Food({
      scene: this.scene,
      x: x,
      y: y,
      texture: 'star',
      frame: {}
    });
    this.foodOverlapTriggered = this.physics.add.overlap(
      this.player.player,
      food.collectible,
      () => this.pickUpFood(food),
      null,
      this,
     );
    return food;
  }

  createVillager(x, y) {
    const villager = new Villager({
      scene: this.scene,
      opt: {
        initialX: x,
        initialY: y,
        foods: this.foods
      }
    });
    this.villagerOverlapTrigger = this.physics.add.overlap(
      this.player.player,
      villager.villager,
      () => this.collideIntoVillager(villager),
      null,
      this,
     );
    return villager;
  }

  update() {
    this.villagers.forEach(function(villager) {
      villager.update();
    });
  }

  getRandomSpawnLocation() {
    // Eventually randomly generate points around the globe
    return {
      x : Math.floor(Math.random() * 800),
      y : Math.floor(Math.random() * 600),
    };
  }

  pickUpFood(food) {
    if(this.foodOverlapTriggered && this.foodOverlapTrigger){
      this.physics.world.removeCollider(this.foodOverlapTrigger);
      return;
    };

    this.foodOverlapTriggered = true;


    food.onCollision();
    this.player.heal(1);
    this.player.eat();
    const {x, y} = this.getRandomSpawnLocation();
    this.createFood(x, y);
  }

  collideIntoVillager(villager) {
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
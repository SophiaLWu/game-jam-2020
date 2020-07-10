import { CONSTANTS } from "../constants.js"
import Food from "./food.js";

class Ecosystem extends Phaser.GameObjects.Graphics {
  constructor(params) {
    super(params.scene, params.opt);
    this.scene = params.scene;
    this.physics = params.scene.physics;
    this.player = params.scene.player;
    this.startingFoodAmount = CONSTANTS.STARTING_FOOD_AMOUNT;
    for (let i = 0; i < this.startingFoodAmount; i++){
      const {x, y} = this.getRandomSpawnLocation();
      this.createFood(x, y);
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
    this.physics.add.overlap(
      this.player.player,
      food.collectible,
      () => this.pickUpFood(food),
      null,
      this,
     );
    return food;
  }

  update() {
  
  }

  getRandomSpawnLocation() {
    // Eventually randomly generate points around the globe
    return {
      x : Math.floor(Math.random() * 800),
      y : Math.floor(Math.random() * 600),
    };
  }

  pickUpFood(food) {
    food.onCollision();
    this.player.addHealth(1);
    const {x, y} = this.getRandomSpawnLocation();
    this.createFood(x, y);
  }
}

export default Ecosystem;
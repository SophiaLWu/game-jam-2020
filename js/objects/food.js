import { manhattanDistance } from "../utils.js"
import { CONSTANTS } from "../constants.js"
import Collectible from "./collectible.js";

const availableFood = [];
const allFood = [];

class Food extends Collectible {
  constructor(params) {
    super(params);

    // physics
    this.physicsBody = this.scene.physics.add.image(this.x, this.y, this.texture.key);
    this.physicsBody.getFood = () => this;
    this.onEatListeners = [];
    availableFood.push(this);
    allFood.push(this);
  }

  update() {
  }

  removeFood() {
    let index = availableFood.indexOf(this);
    availableFood.splice(index, 1);
    index = allFood.indexOf(this);
    allFood.splice(index, 1);
  }

  addEatListener(callback) {
    this.onEatListeners.push(callback);
  }

  onCollision() {
    //super.onCollision();
    this.removeFood();
    this.physicsBody.disableBody(true, true);
    this.onEatListeners.forEach((callback) => {
      callback();
    });
    this.onEatListeners = [];
  }
}

Food.getClosestAvailableFood = (x, y) => {
  let index = 0;
  let bestIndex = -1;
  let bestDist = Number.MAX_SAFE_INTEGER;
  availableFood.forEach((food) => {
    const dist = manhattanDistance(food.x, food.y, x, y);
    if (dist < bestDist) {
      bestDist = dist;
      bestIndex = index;
    }
    index++;
  });

  let closestAvailableFood;
  if (index != -1) {
    closestAvailableFood = availableFood[bestIndex];
    availableFood.splice(index, 1);
  } else if (allFood.length > 0) {
    return allFood[Math.floor(Math.random() * allFood.length)];
  }
  return closestAvailableFood;
}

export default Food;
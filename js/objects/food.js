import { manhattanDistance } from "../utils.js"
import { CONSTANTS } from "../constants.js"
import Collectible from "./collectible.js";
import Villager from "./villager.js";

const allFood = [];
let foodId = 0;

class Food extends Collectible {
  constructor(params) {
    super(params);
    this.id = foodId;
    foodId++;

    // physics
    this.physicsBody = this.scene.physics.add.image(this.x, this.y, this.texture.key);
    this.physicsBody.getFood = () => this;
    this.onEatListeners = [];
    allFood.push(this);
  }

  update() {
  }

  removeFood() {
    const index = allFood.indexOf(this);
    allFood.splice(index, 1);

    this.destroy(true);
  }

  addEatListener(callback) {
    this.onEatListeners.push(callback);
  }

  onCollision() {
    this.removeFood();
    this.physicsBody.disableBody(true, true);
    this.onEatListeners.forEach((callback) => {
      callback();
    });
    this.onEatListeners = [];
  }
}

Food.getAvailableFood = () => {
  const targetedFood = Villager.getTargetedFood();
  const availableFood = [];
  allFood.forEach((food) => {
    if (!targetedFood.has(food.id)) {
      availableFood.push(food);
    }
  });
  return availableFood;
}

Food.getClosestAvailableFood = (x, y) => {
  let index = 0;
  let bestIndex = -1;
  let bestDist = Number.MAX_SAFE_INTEGER;
  const availableFood = Food.getAvailableFood();
  availableFood.forEach((food) => {
    const dist = manhattanDistance(food.physicsBody.x, food.physicsBody.y, x, y);
    if (dist < bestDist) {
      bestDist = dist;
      bestIndex = index;
    }
    index++;
  });

  let closestAvailableFood;
  if (bestIndex != -1) {
    closestAvailableFood = availableFood[bestIndex];
  } else if (allFood.length > 0) {
    return allFood[Math.floor(Math.random() * allFood.length)];
  }
  return closestAvailableFood;
}

export default Food;
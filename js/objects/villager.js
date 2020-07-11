import { manhattanDistance } from "../utils.js"
import { CONSTANTS } from "../constants.js"
import Food from "./food.js"

const allVillagers = [];
const availableVillagers = [];
let activeVillagers = [];
const MoodEnum = {
  NORMAL: 0,
  SCARED: 1,
  ANGRY: 2
};

class Villager extends Phaser.GameObjects.Graphics {
  constructor(params) {
    super(params.scene, params.opt);

    activeVillagers.push(this);

    this.moveVillagerTick = Date.now();
    this.physicsBody = this.scene.physics.add.sprite(params.opt.initialX, params.opt.initialY, 'villager');
    this.physicsBody.setCollideWorldBounds(true);

    this.physicsBody.getVillager = () => this;

    this.mood = MoodEnum.NORMAL;
    this.velocity = 100;
    allVillagers.push(this);
    availableVillagers.push(this);

    this.findNewFood();
  }

  findNewFood() {
    const lastFoodTarget = this.targetFood;
    this.targetFood = null;
    const targetFood = Food.getClosestAvailableFood(this.physicsBody.x, this.physicsBody.y);
    if (targetFood) {
      targetFood.addEatListener(() => this.findNewFood());
      if (targetFood !== lastFoodTarget) {
        setTimeout((() => {
          this.targetFood = targetFood;
        }).bind(this), CONSTANTS.FOOD_FIND_DELAY_MILLIS_MIN);
      }
    }
  }

  getFoodFindDelay() {
    return 
      CONSTANTS.FOOD_FIND_DELAY_MILLIS_MIN +
      Math.random() * 
        (CONSTANTS.FOOD_FIND_DELAY_MILLIS_MAX -
         CONSTANTS.FOOD_FIND_DELAY_MILLIS_MIN)
  }

  update() {
    this.setVillagerMovement();
  }

  getDirectionTowardFood() {
    let direction = {
      x: 0,
      y: 0
    };

    if (this.targetFood === null) {
      return direction;
    }

    const epsilson = 2;
    var foodX = this.targetFood.x
    var foodY = this.targetFood.y

    if (this.physicsBody.x < (foodX - epsilson)) {
      direction['x'] += 1;
    } else if (this.physicsBody.x > (foodX + epsilson)) {
      direction['x'] -= 1;
    }
    if (this.physicsBody.y < (foodY - epsilson)) {
      direction['y'] += 1;
    } else if (this.physicsBody.y > (foodY + epsilson)) {
      direction['y'] -= 1;
    }
    return direction;
  }

  setVillagerMovement() {
    let direction;

    switch (this.mood) {
      case MoodEnum.NORMAL:
        direction = this.getDirectionTowardFood();
        break;
      case MoodEnum.SCARED:
        break;
      case MoodEnum.ANGRY:
        break;
    }

    if (direction) {
      this.move(direction);
    }
  }

  move(direction) {
    if (direction.x !== 0 && direction.y !== 0) {
      direction.x *= CONSTANTS.ONE_OVER_SQRT_TWO;
      direction.y *= CONSTANTS.ONE_OVER_SQRT_TWO;
    }

    this.physicsBody.setVelocityX(this.velocity * direction.x);
    this.physicsBody.setVelocityY(this.velocity * direction.y);
    this.physicsBody.setDepth(this.getFeetLocation().y);
  }

  getFeetLocation() {
    return {
      x: this.physicsBody.x,
      y: this.physicsBody.y + 20,
    };
  }

  isAngry() {
    return this.mood == MoodEnum.ANGRY;
  }

  kill() {
    const index = activeVillagers.indexOf(this);
    activeVillagers.splice(index, 1);
    this.physicsBody.disableBody(true, true);
  }
}

Villager.getClosestVillager = (x, y) => {
  let index = 0;
  let bestIndex = -1;
  let bestDist = Number.MAX_SAFE_INTEGER;
  availableVillagers.forEach((villager) => {
    const dist = manhattanDistance(villager.physicsBody.x, villager.physicsBody.y, x, y);
    if (dist < bestDist) {
      bestDist = dist;
      bestIndex = index;
    }
    index++;
  });

  let closestAvailableVillager;
  if (bestIndex != -1) {
    closestAvailableVillager = availableVillagers[bestIndex];
    availableVillagers.splice(bestIndex, 1);
  } else if (allVillagers.length > 0) {
    return allVillagers[Math.floor(Math.random() * allVillagers.length)];
  }
  return closestAvailableVillager;
}

Villager.getTargetedFood = () => {
  const targetedFood = new Set();
  activeVillagers.forEach((villager) => {
    if (villager && villager.targetedFood && villager.targetFood.id) {
      targetedFood.add(villager.targetFood.id);
    }
  });
  return targetedFood;
};

export default Villager;
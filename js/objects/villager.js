import { manhattanDistance } from "../utils.js"
import { CONSTANTS } from "../constants.js"
import Food from "./food.js"

const allVillagers = [];
const availableVillagers = [];

class Villager extends Phaser.GameObjects.Graphics {
  constructor(params) {
    super(params.scene, params.opt);

    this.MoodEnum = {
      SCARED: 1,
      ANGRY: 2
    }

    this.moveVillagerTick = Date.now();
    this.physicsBody = this.scene.physics.add.sprite(params.opt.initialX, params.opt.initialY, 'villager');
    this.physicsBody.setCollideWorldBounds(true);
    this.physicsBody.getVillager = () => this;

    this.mood = this.MoodEnum.SCARED;
    this.velocity = 100;
    allVillagers.push(this);
    availableVillagers.push(this);

    this.findNewFood();
  }

  findNewFood() {
    this.foodToEat = Food.getClosestAvailableFood(this.physicsBody.x, this.physicsBody.y);
    if (this.foodToEat) {
      this.foodToEat.addEatListener(() => this.findNewFood());
    }
  }

  update() {
    this.setVillagerMovement();
  }

  setVillagerMovement() {
    const epsilson = 2;
    var foodX = this.foodToEat.x
    var foodY = this.foodToEat.y

    let direction = {
      x: 0,
      y: 0
    };

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

    this.move(direction);
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
    return this.mood == this.MoodEnum.ANGRY;
  }

  kill() {
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

export default Villager;
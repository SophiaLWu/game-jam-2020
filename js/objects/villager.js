import { distanceBetweenPoints } from "../utils.js"
import { CONSTANTS } from "../constants.js"
import Food from "./food.js"

let activeVillagers = [];

class Villager extends Phaser.GameObjects.Graphics {
  constructor(params) {
    super(params.scene, params.opt);

    this.MoodEnum = {
      SCARED: 1,
      ANGRY: 2
    }

    activeVillagers.push(this);

    this.moveVillagerTick = Date.now();
    this.physicsBody = this.scene.physics.add.sprite(params.opt.initialX, params.opt.initialY, 'villager');
    this.physicsBody.setCollideWorldBounds(true);
    this.changeVillagerDirection();
    this.mood = this.MoodEnum.SCARED;
    this.foods = params.opt.foods;
    this.velocity = 100;

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
    const direction = this.getDirectionTowardFood()

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

  changeVillagerDirection() {
    var directions = ["left", "right", "up", "down"]
    var direction = directions[Math.floor(Math.random() * directions.length)]

    switch(direction) {
      case "left":
        this.physicsBody.setVelocityX(-100);
        this.physicsBody.setVelocityY(0);
        break;
      case "right":
        this.physicsBody.setVelocityX(100);
        this.physicsBody.setVelocityY(0);
        break;
      case "up":
        this.physicsBody.setVelocityX(0);
        this.physicsBody.setVelocityY(100);
        break;
      case "down":
        this.physicsBody.setVelocityX(0);
        this.physicsBody.setVelocityY(-100);
        break;
    }
  }

  isAngry() {
    return this.mood == this.MoodEnum.ANGRY;
  }

  kill() {
    const index = activeVillagers.indexOf(this);
    activeVillagers.splice(index, 1);
    this.physicsBody.disableBody(true, true);
  }
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
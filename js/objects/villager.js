import { distanceBetweenPoints } from "../utils.js"
import { CONSTANTS } from "../constants.js"
import Food from "./food.js"

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
    this.changeVillagerDirection();
    this.mood = this.MoodEnum.SCARED;
    this.foods = params.opt.foods;
    // this.x = params.opt.initialX;
    // this.y = params.opt.initialY;
    this.velocity = 100;

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
    this.physicsBody.disableBody(true, true);
  }
}

export default Villager;
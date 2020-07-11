import { distanceBetweenPoints } from "../utils.js"
import { CONSTANTS } from "../constants.js"

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

    this.foodToEat = this.findClosestFood();
  }

  update() {
    this.foodToEat = this.findClosestFood();
    this.setVillagerMovement();
  }

  setVillagerMovement() {
    var foodX = this.foodToEat.x
    var foodY = this.foodToEat.y

    let direction = {
      x: 0,
      y: 0
    };

    if (this.physicsBody.x < foodX) {
      direction['x'] += 1;
    }
    if (this.physicsBody.x > foodX) {
      direction['x'] -= 1;
    }
    if (this.physicsBody.y < foodY) {
      direction['y'] += 1;
    }
    if (this.physicsBody.y > foodY) {
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

  findClosestFood() {
    var distancesToFoods = {};
    this.foods.children.iterate(function(food) {
      if(food.body.enable){ // Only check the distance to food that hasn't been eaten
        var distance = distanceBetweenPoints(this.physicsBody.x, food.x, this.physicsBody.y, food.y);
        distancesToFoods[distance] = food;
      }
    }.bind(this));

    var min = Math.min(...Object.keys(distancesToFoods));
    var food = distancesToFoods[min]
    return food;
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
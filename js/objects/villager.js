import { manhattanDistance, distanceBetweenPoints } from "../utils.js"
import { CONSTANTS, MoodEnum } from "../constants.js"
import Food from "./food.js"

let activeVillagers = [];

class Villager extends Phaser.GameObjects.Graphics {
  constructor(params) {
    super(params.scene, params.opt);

    activeVillagers.push(this);

    this.scene = params.scene;
    this.moveVillagerTick = Date.now();
    this.physicsBody = this.scene.physics.add.sprite(params.opt.initialX, params.opt.initialY, 'maleVillager1', 0);
    this.physicsBody.setScale(2,2);
    this.physicsBody.setCollideWorldBounds(true);

    this.physicsBody.getVillager = () => this;

    this.updateMood(params.opt.mood || MoodEnum.NORMAL);
    this.velocity = Math.floor(Math.random() * 100) + 50;
    // this.velocityX;
    // this.velocityY;

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

  getDirectionToward(x, y) {
    const epsilson = 2;
    let direction = {
      x: 0,
      y: 0
    };

    if (this.physicsBody.x < (x - epsilson)) {
      direction['x'] += 1;
    } else if (this.physicsBody.x > (x + epsilson)) {
      direction['x'] -= 1;
    }
    if (this.physicsBody.y < (y - epsilson)) {
      direction['y'] += 1;
    } else if (this.physicsBody.y > (y + epsilson)) {
      direction['y'] -= 1;
    }
    return direction;
  }

  getDirectionTowardFood() {
    if (this.targetFood === null) {
      return {x:0, y:0};
    }

    return this.getDirectionToward(
      this.targetFood.x,
      this.targetFood.y
    );
  }

  getDirectionTowardPlayer() {
    const player = this.scene.player;
    return this.getDirectionToward(
      player.physicsBody.x,
      player.physicsBody.y
    );
  }

  getDirectionTowardVillage() {
    const player = this.scene.player;
    return this.getDirectionToward(
      CONSTANTS.VILLAGE_X,
      CONSTANTS.VILLAGE_Y
    );
  }

  setVillagerMovement() {
    let direction;

    switch (this.mood) {
      case MoodEnum.NORMAL:
        direction = this.getDirectionTowardFood();
        break;
      case MoodEnum.SCARED:
        direction = this.getDirectionTowardVillage();
        break;
      case MoodEnum.ANGRY:
        direction = this.getDirectionTowardPlayer();
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
    // var velocityX = this.velocity * direction.x;
    // var velocityY = this.velocity * direction.y;
    this.physicsBody.setDepth(this.getFeetLocation().y);

    this.setVillagerMoveAnimation();
  }

  setVillagerMoveAnimation() {
    if (this.physicsBody.body.velocity.x > 0) { //walking right
      this.physicsBody.anims.play('rightMaleVillager1', true);
    } else if (this.physicsBody.body.velocity.x < 0) { //walking left
      this.physicsBody.anims.play('leftMaleVillager1', true);
    } 
    if ((this.physicsBody.body.velocity.y > 0) && (Math.abs(this.physicsBody.body.velocity.y) > Math.abs(this.physicsBody.body.velocity.x)) ) { //walking mostly down
      this.physicsBody.anims.play('downMaleVillager1', true);
    } else if  ((this.physicsBody.body.velocity.y < 0) && (Math.abs(this.physicsBody.body.velocity.y) > Math.abs(this.physicsBody.body.velocity.x )) ) { //walking mostly up
      this.physicsBody.anims.play('upMaleVillager1', true);
    }
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

  updateMood(mood) {
    this.mood = mood;

    switch(this.mood) {
      case MoodEnum.NORMAL:
        this.physicsBody.clearTint();
        break;
      case MoodEnum.SCARED:
        this.physicsBody.setTint(0x05C6FF);
        break;
      case MoodEnum.ANGRY:
        this.physicsBody.setTint(0xff0000);
        break;
    }
  }
}

Villager.getClosestVillager = (x, y) => {
  let index = 0;
  let bestIndex = -1;
  let bestDist = Number.MAX_SAFE_INTEGER;
  activeVillagers.forEach((villager) => {
    const dist = manhattanDistance(villager.physicsBody.x, villager.physicsBody.y, x, y);
    if (dist < bestDist) {
      bestDist = dist;
      bestIndex = index;
    }
    index++;
  });

  let closestAvailableVillager;
  if (bestIndex != -1) {
    closestAvailableVillager = activeVillagers[bestIndex];
    activeVillagers.splice(bestIndex, 1);
  } else if (activeVillagers.length > 0) {
    return activeVillagers[Math.floor(Math.random() * allVillagers.length)];
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

Villager.scareOtherVillagers = (playerX, playerY) => {
  activeVillagers.forEach((villager) => {
    const dist = distanceBetweenPoints(villager.physicsBody.x, villager.physicsBody.y, playerX, playerY);
    if (dist <= CONSTANTS.SCARE_VILLAGER_RANGE && !villager.isAngry()) {
      villager.updateMood(MoodEnum.SCARED);
    }
  });
}

Villager.buildVillagerAnimations = (scene) => {
  scene.anims.create({
    key: 'rightMaleVillager1',
    frames: scene.anims.generateFrameNumbers('maleVillager1', { start: 6, end: 8 } ),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: 'leftMaleVillager1',
    frames: scene.anims.generateFrameNumbers('maleVillager1', { start: 3, end: 5 } ),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: 'downMaleVillager1',
    frames: scene.anims.generateFrameNumbers('maleVillager1', { start: 0, end: 2 } ),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: 'upMaleVillager1',
    frames: scene.anims.generateFrameNumbers('maleVillager1', { start: 9, end: 11 } ),
    frameRate: 10,
    repeat: -1
  });

};

export default Villager;
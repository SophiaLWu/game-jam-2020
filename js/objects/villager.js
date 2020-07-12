import { manhattanDistance, distanceBetweenPoints } from "../utils.js"
import { CONSTANTS, MoodEnum } from "../constants.js"
import Food from "./food.js"
import { Curves, getTween } from "../utils.js"

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
    this.physicsBody.setOrigin(0.5, 0.75);

    // Death animation
    this.isVillagerDead = null;
    this.villagerDeadTween = null;
    this.wasPaused = false;

    this.physicsBody.getVillager = () => this;

    this.updateMood(params.opt.mood || MoodEnum.NORMAL);
    this.velocity = Math.floor(Math.random() * 100) + 50;
    this.stuckEnd = null;

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
    if (!this.isVillagerDead){
      this.setVillagerMovement();
    } else if (this.villagerDeadTween === null) {
      // villager dead, do animation
      this.villagerDeadTween = getTween(
        /* startValue */ 0,
        /* endValue */ -90,
        /* duration */ 800,
        /* ucrve */ Curves.EASE_OUT_BOUNCE,
        /* onComplete  (() => {
          setTimeout(() => {
            this.physicsBody.disableBody(true, true);
          }, 3000)
        }) */
      )
    } else {
      this.physicsBody.angle = this.villagerDeadTween();
    }
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

    if (this.scene.player.isGamePaused) {
      if (!this.wasPaused) {
        this.wasPaused = true;

        this.move({x: 0, y: 0});
        this.physicsBody.anims.pause();
      }
      return;
    } else {
      this.wasPaused = false;
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
    }

    if (direction) {
      this.move(direction);
    }
  }

  move(direction) {
    const touching = this.physicsBody.body.touching;

    if (this.stuckEnd != null){
      if (this.stuckEnd < new Date().getTime()) {
        if (!touching.none) {
          this.findNewFood();
          this.stuckEnd = null;
        }
      }
    } else if (!touching.none) {
      this.stuckEnd = new Date().getTime() + CONSTANTS.STUCK_WALK_DURATION;
    }

    if (direction.x !== 0 && direction.y !== 0) {
      direction.x *= CONSTANTS.ONE_OVER_SQRT_TWO;
      direction.y *= CONSTANTS.ONE_OVER_SQRT_TWO;
    }

    this.physicsBody.setVelocityX(this.velocity * direction.x);
    this.physicsBody.setVelocityY(this.velocity * direction.y);
    this.physicsBody.setDepth(this.getFeetLocation().y);

    this.setVillagerMoveAnimation(direction);
  }

  getAnimationNameFromDirection(direction) {
    const mostlyVertical = direction.x === 0;
    const isAngry = this.isAngry();
    
    if (direction.x > 0) {
      return isAngry ? 'rightMilitary1' : 'rightMaleVillager1';
    } else if (direction.x < 0) {
      return isAngry ? 'leftMilitary1' : 'leftMaleVillager1';
    } else if (direction.y < 0) {
      return isAngry ? 'upMilitary1' : 'upMaleVillager1';
    } else {
      return isAngry ? 'downMilitary1' : 'downMaleVillager1';
    }
  }

  setVillagerMoveAnimation(direction) {
    let isMoving = direction.x != 0 || direction.y != 0;
    const animName = this.getAnimationNameFromDirection(direction);
    this.physicsBody.anims.play(animName, true);
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

  isScared() {
    return this.mood == MoodEnum.SCARED;
  }

  kill() {
    this.isVillagerDead = 1
    this.physicsBody.disableBody(true, false);
    const index = activeVillagers.indexOf(this);
    activeVillagers.splice(index, 1);
  }

  anger() {
    this.updateMood(MoodEnum.ANGRY);
  }

  slowDown() {
    this.velocity *= 0.95;
  }

  updateMood(mood) {
    this.mood = mood;

    switch(this.mood) {
      case MoodEnum.NORMAL:
        this.physicsBody.clearTint();
        this.velocity = Math.floor(Math.random() * 50) + 150;
        break;
      case MoodEnum.SCARED:
        this.physicsBody.setTint(0x05C6FF);
        this.velocity += 200
        break;
      case MoodEnum.ANGRY:
        this.physicsBody.setTint(0xff0000);
        this.velocity = Math.floor(Math.random() * 50) + 200 + 5 * (activeVillagers.length - CONSTANTS.STARTING_VILLAGER_AMOUNT); 
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
    frames: scene.anims.generateFrameNames('maleVillager1', { prefix: 'right_walk', end: 2, suffix: '.png'}), //scene.anims.generateFrameNumbers('maleVillager1', { start: 6, end: 8 } ),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: 'leftMaleVillager1',
    frames: scene.anims.generateFrameNames('maleVillager1', { prefix: 'left_walk', end: 2, suffix: '.png'}), //scene.anims.generateFrameNumbers('maleVillager1', { start: 3, end: 5 } ),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: 'downMaleVillager1',
    frames: scene.anims.generateFrameNames('maleVillager1', { prefix: 'down_walk', end: 2, suffix: '.png'}), //scene.anims.generateFrameNumbers('maleVillager1', { start: 0, end: 2 } ),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: 'upMaleVillager1',
    frames: scene.anims.generateFrameNames('maleVillager1', { prefix: 'up_walk', end: 2, suffix: '.png'}), //scene.anims.generateFrameNumbers('maleVillager1', { start: 9, end: 11 } ),
    frameRate: 10,
    repeat: -1
  });

  ////

  scene.anims.create({
    key: 'rightMilitary1',
    frames: scene.anims.generateFrameNames('military1', { prefix: 'right_walk', end: 2, suffix: '.png'} ),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: 'leftMilitary1',
    frames: scene.anims.generateFrameNames('military1', { prefix: 'left_walk', end: 2, suffix: '.png'}),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: 'downMilitary1',
    frames: scene.anims.generateFrameNames('military1', { prefix: 'down_walk', end: 2, suffix: '.png'}),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: 'upMilitary1',
    frames: scene.anims.generateFrameNames('military1', { prefix: 'up_walk', end: 2, suffix: '.png'}),
    frameRate: 10,
    repeat: -1
  });

};

Villager.clearActiveVillagers = () => {
  activeVillagers.length = 0;
}

export default Villager;
import { CONSTANTS } from "../constants.js";
import Bar from "../objects/bar.js";
import Villager from "../objects/villager.js";

const MAX_HEALTH = 100;

class Player extends Phaser.GameObjects.Graphics {
  constructor(params) {
    super(params.scene, params.opt);

    // input
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    // physics
    this.physicsBody = this.scene.physics.add.sprite(400, 400, 'dude');
    this.physicsBody.setCollideWorldBounds(true);

    this.health = MAX_HEALTH;
    this.healthBar = new Bar({
      scene: this.scene,
      x: 10,
      y: 10,
      startValue: this.health,
      barHeight: 20,
      barWidth: 100
    });
    
    //Speeds
    this.humanSpeed = 400;
    this.werewolfSpeed = this.humanSpeed*2;
    this.speed = this.humanSpeed;

    this.target;
    
    // For testing
    this.healKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.damageKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    this.hungerKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    this.eatKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
    this.turnWerewolfKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);

    //Hunger variables and timer
    this.stomachContents = CONSTANTS.STOMACH_CONTENTS_STARTING;
    this.stomachBar = new Bar({
      scene: this.scene,
      x: 10,
      y: 25,
      startValue: this.stomachContents,
      barHeight: 20,
      barWidth: 100
    })
    
    var hungerTimer = this.scene.time.addEvent({
      delay: 1000,                // ms
      callback: this.getHungry,
      args: [1],
      callbackScope: this,
      loop: true
    });

    //Werewolf state variables
    this.isWerewolf = false;
    
  }

  update() {
    //Check food status for turning
    //if not wolf


    let direction = {
      x: 0,
      y: 0
    };

    if (this.isWerewolf) {
      this.stepTowardVillager();
    } else
    {
      if (this.cursors.left.isDown) {
        direction['x'] -= 1;
      }
      if (this.cursors.right.isDown) {
        direction['x'] += 1;
      }
      if (this.cursors.up.isDown) {
        direction['y'] -= 1;
      }
      if (this.cursors.down.isDown) {
        direction['y'] += 1;
      }
      if (this.healKey.isDown) {
        this.heal(1);
      }
      if (this.damageKey.isDown) {
        this.damage(1);
      }
      if (this.hungerKey.isDown) {
        this.stomachContents = 0;
      }
      if (this.eatKey.isDown) {
        this.eatFood();
      }
      if (this.turnWerewolfKey.isDown) {
        this.turnWerewolf();
      }
      this.move(direction);
    }
  }

  move(direction) {
    if (direction.x !== 0 && direction.y !== 0) {
      direction.x *= CONSTANTS.ONE_OVER_SQRT_TWO;
      direction.y *= CONSTANTS.ONE_OVER_SQRT_TWO;
    }

    this.physicsBody.setVelocityX(this.speed * direction.x);
    this.physicsBody.setVelocityY(this.speed * direction.y);
    this.physicsBody.setDepth(this.physicsBody.y + (this.physicsBody.height * 0.5));
  }

  kill() {
    console.log("You're dead!");
    gameOver = true;
  }

  damage(amount) {
    this.health = this.health - amount;
    this.healthBar.update(this.health);
    if (this.health <= 0) {
      this.kill();
    }
  }

  heal(amount) {
    this.health = Math.min(this.health + amount, MAX_HEALTH);
    this.healthBar.update(this.health);
  }

  eatFood() {
    this.stomachContents = Math.min(this.stomachContents + 10, CONSTANTS.STOMACH_CONTENTS_MAX);
    this.updateStomatchBar();
  }

  updateStomatchBar() {
    this.stomachBar.update(this.stomachContents);
  }

  getHungry(amount) {
    this.stomachContents = Math.max(this.stomachContents - amount, 0);
    this.updateStomatchBar();

    if (this.stomachContents == 0 && !this.isWerewolf) {
      this.turnWerewolf();
    }
  }

  turnWerewolf() {
    this.isWerewolf = true;
    this.physicsBody.setTint(0xff0000);
    this.speed = this.werewolfSpeed;
    this.determineVillagerToConsume();
    console.log("Yer a Were-wuff, 'Erry!");
  }

  turnHuman() {
    this.stomachContents = CONSTANTS.STOMACH_CONTENTS_MAX;
    this.updateStomatchBar();
    this.isWerewolf = false;
    this.physicsBody.clearTint();
    this.speed = this.humanSpeed;
    this.resetVillagerToConsume();
    console.log("You ate a big one heh. Back to a a human you go.");
  }

  isWerewolf() {
    return this.isWerewolf;
  }

  determineVillagerToConsume(){
    this.villagerToConsume = Villager.getClosestVillager(this.physicsBody.x, this.physicsBody.y);
  }

  resetVillagerToConsume() {
    this.villagerToConsume = null;
  }

  stepTowardVillager(){
    if (!this.villagerToConsume) { return };

    const epsilson = 4;
    var villagerX = this.villagerToConsume.physicsBody.x
    var villagerY = this.villagerToConsume.physicsBody.y

    let direction = {
      x: 0,
      y: 0
    };

    if (this.physicsBody.x < (villagerX - epsilson)) {
      direction['x'] += 1;
    } else if (this.physicsBody.x > (villagerX + epsilson)) {
      direction['x'] -= 1;
    }
    if (this.physicsBody.y < (villagerY - epsilson)) {
      direction['y'] += 1;
    } else if (this.physicsBody.y > (villagerY + epsilson)) {
      direction['y'] -= 1;
    }

    this.autoMove(direction);
  }

  autoMove(direction) {
    if (direction.x !== 0 && direction.y !== 0) {
      direction.x *= CONSTANTS.ONE_OVER_SQRT_TWO;
      direction.y *= CONSTANTS.ONE_OVER_SQRT_TWO;
    }

    this.physicsBody.setVelocityX(this.speed * direction.x);
    this.physicsBody.setVelocityY(this.speed * direction.y);
    this.physicsBody.setDepth(this.getFeetLocation().y);
  }

  getFeetLocation() {
    return {
      x: this.physicsBody.x,
      y: this.physicsBody.y + 20,
    };
  }
}

export default Player;
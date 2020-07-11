import { CONSTANTS } from "../constants.js";
import Bar from "../objects/bar.js";

const MAX_HEALTH = 100;

class Player extends Phaser.GameObjects.Graphics {
  constructor(params) {
    super(params.scene, params.opt);

    // input
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    // physics
    this.player = this.scene.physics.add.sprite(400, 400, 'dude');
    this.player.setCollideWorldBounds(true);

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
    this.werewolfSpeed = this.humanSpeed*3;
    this.speed = this.humanSpeed;

    this.target;
    
    // For testing
    this.healKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.damageKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    this.hungerKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    this.eatKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);

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

    if(this.isWerewolf){
      this.stepTowardTarget(this.target);
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
        this.eat();
      }


    }
    this.move(direction);
  }

  move(direction) {
    if (direction.x !== 0 && direction.y !== 0) {
      direction.x *= CONSTANTS.ONE_OVER_SQRT_TWO;
      direction.y *= CONSTANTS.ONE_OVER_SQRT_TWO;
    }

    this.player.setVelocityX(this.speed * direction.x);
    this.player.setVelocityY(this.speed * direction.y);
    this.player.setDepth(this.player.y + (this.player.height * 0.5));
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

  eat() {
    this.stomachContents = Math.min(this.stomachContents + 10, CONSTANTS.STOMACH_CONTENTS_MAX);

    this.stomachBar.update(this.stomachContents);
  }

  getHungry(amount) {
    this.stomachContents = Math.max(this.stomachContents - amount, 0);

    this.stomachBar.update(this.stomachContents);

    if (this.stomachContents == 0 && !this.isWerewolf)
    {
      this.turnWerewolf();
    }

  }

  turnWerewolf() {
    this.isWerewolf = true;
    this.player.setTint(0xff0000);
    this.speed = this.werewolfSpeed;
    this.determineTarget();
    console.log("Yer a Were-wuff, 'Erry!");

  }

  isWerewolf() {
    return this.isWerewolf
  }

  turnHuman(){
    this.isWerewolf = false;
    this.player.setTint(0x000000);
    this.speed = this.humanSpeed;
  }

  onCollision() {
    if (!this.isWerewolf)
    {
      this.damage(1);
    } else
    {
      //max stomach contents
      //turn back to human
    }
  }

  determineTarget(){

  }

  stepTowardTarget(target){

  }
}

export default Player;
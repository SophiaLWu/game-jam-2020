import { CONSTANTS } from "../constants.js";
import Bar from "../objects/bar.js";
import Villager from "../objects/villager.js";

const MAX_HEALTH = 100;

const hitbox = {
  x1: 44,
  y1: 24,
  x2: 65,
  y2: 73,
};

class Player extends Phaser.GameObjects.Graphics {
  constructor(params) {
    super(params.scene, params.opt);

    // input
    this.camera = params.camera;
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.WKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.AKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.SKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.DKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // physics

    this.physicsBody = this.scene.physics.add.sprite(400, 400, 'princess');
    this.physicsBody.setCollideWorldBounds(true);

    // hitbox size
    const width = hitbox.x2 - hitbox.x1;
    const height = hitbox.y2 - hitbox.y1;
    const newX = Math.floor((hitbox.x2 + hitbox.x1) * 0.5);
    const newY = Math.floor((hitbox.y2 + hitbox.y1) * 0.5);
    this.physicsBody.body.setSize(width, height, 0, 0);
    this.physicsBody.body.setOffset(newX, newY);


    this.health = MAX_HEALTH;
    this.healthBar = new Bar({
      scene: this.scene,
      name: 'Health',
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
    
    //Score tracking
    this.foodEaten = 0;
    this.villagersEaten = 0;

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
      name: 'Stomach Contents',
      x: 10,
      y: 25,
      startValue: this.stomachContents,
      barHeight: 20,
      barWidth: 100
    })
    
    var hungerTimer = this.scene.time.addEvent({
      delay: 100,                // ms
      callback: this.getHungry,
      args: [1],
      callbackScope: this,
      loop: true
    });

    //Werewolf state variables
    this.isWerewolf = false;
    

    //Princess Animations
    
    this.scene.anims.create({
      key: 'rightPrincess',
      frames: this.scene.anims.generateFrameNumbers('princessRun', { start: 0, end: 7 } ),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'idlePrincess',
      frames: this.scene.anims.generateFrameNumbers('princessIdle', { start: 0, end: 11 } ),
      frameRate: 10,
      repeat: -1
    });

    //Wolf Animations
    this.scene.anims.create({
      key: 'runWolf',
      frames: this.scene.anims.generateFrameNumbers('wolfRun', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'attackWolf',
      frames: this.scene.anims.generateFrameNumbers('wolfRun', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    })
<<<<<<< HEAD
 
=======

    this.snowSound = this.scene.sound.add('humanFootstepsSnowSound', { volume: 0.1, loop: true });  
>>>>>>> 08cf33b... Sounds
  }

  update() {
    this.healthBar.update();
    this.stomachBar.update();

    //Check food status for turning
    //if not wolf


    let direction = {
      x: 0,
      y: 0
    };

    if (this.isWerewolf) {
      this.stepTowardVillager();
    } else {
      if (this.cursors.left.isDown || this.AKey.isDown) {
        direction['x'] -= 1;
        this.physicsBody.anims.play('rightPrincess', true);

        if (!this.physicsBody.flipX)
        {          
          this.physicsBody.flipX = true;
        }
      }
      if (this.cursors.right.isDown || this.DKey.isDown) {
        direction['x'] += 1;
        this.physicsBody.anims.play('rightPrincess', true);

        if (this.physicsBody.flipX)
        {          
          this.physicsBody.flipX = false;
        }
      }
      if (this.cursors.up.isDown || this.WKey.isDown) {
        direction['y'] -= 1;
        this.physicsBody.anims.play('rightPrincess', true);
      }
      if (this.cursors.down.isDown || this.SKey.isDown) {
        direction['y'] += 1;
        this.physicsBody.anims.play('rightPrincess', true);
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
    if (direction.x == 0 && direction.y == 0) {
      if (this.snowSound.isPlaying) {
        this.snowSound.pause();
      }
    } else {
      if (this.snowSound.isPaused) {
        this.snowSound.resume();
      } else if (!this.snowSound.isPlaying) {
        this.snowSound.play();
      }
    }

    if (direction.x !== 0 && direction.y !== 0) {
      direction.x *= CONSTANTS.ONE_OVER_SQRT_TWO;
      direction.y *= CONSTANTS.ONE_OVER_SQRT_TWO;
    }

    if ((!this.isWerewolf) && direction.x == 0 && direction.y == 0) {
      this.physicsBody.anims.play('idlePrincess', true);
    } else if (this.isWerewolf && direction.x == 0) {
      this.physicsBody.anims.play('attackWolf', true);
    }
    this.doMove(direction);
  }

  doMove(direction) {
    this.physicsBody.setVelocityX(this.speed * direction.x);
    this.physicsBody.setVelocityY(this.speed * direction.y);
    this.physicsBody.setDepth(this.getFeetLocation().y);

  }

  kill() {
    console.log("You're dead!");
    this.scene.gameOver = true;
  }

  damage(amount) {
    this.camera.shakeEffect.start(110, 0.006);
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
    let sfx = this.scene.sound.add('eatSound', { volume: 0.4, loop: false });
    sfx.play();
    this.foodEaten += 1;
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
    let sfx = this.scene.sound.add('transformSound', { volume: 0.3, loop: false });
    sfx.play();
    this.damage(1);
    this.setCollisions(false);
    this.camera.shakeEffect.start(600, 0.01);
    this.physicsBody.anims.play('runWolf', true);
    this.isWerewolf = true;
    this.speed = this.werewolfSpeed;
    this.physicsBody.setScale(2,2);
    this.determineVillagerToConsume();
    console.log("Yer a Were-wuff, 'Erry!");
  }

  turnHuman() {
    this.setCollisions(true);
    this.stomachContents = CONSTANTS.STOMACH_CONTENTS_MAX;
    this.updateStomatchBar();
    this.isWerewolf = false;
    this.physicsBody.clearTint();
    this.speed = this.humanSpeed;
    this.resetVillagerToConsume();
    this.physicsBody.setScale(1,1);
    console.log("You ate a big one heh. Back to a human you go.");
  }

  isWerewolf() {
    return this.isWerewolf;
  }

  determineVillagerToConsume() {
    this.villagerToConsume = Villager.getClosestVillager(this.physicsBody.x, this.physicsBody.y);
  }

  resetVillagerToConsume() {
    this.villagerToConsume = null;
  }

  stepTowardVillager() {
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

      if (this.physicsBody.flipX)
      {          
        this.physicsBody.flipX = false;
      }
    } else if (this.physicsBody.x > (villagerX + epsilson)) {
      direction['x'] -= 1;

      if (!this.physicsBody.flipX)
      {          
        this.physicsBody.flipX = true;
      }
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

    this.doMove(direction);
  }

  getFeetLocation() {
    return {
      x: this.physicsBody.x,
      y: this.physicsBody.y + hitbox.y2,
    };
  }
}

export default Player;
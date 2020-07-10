const ONE_OVER_SQRT_TWO = 1.0/Math.sqrt(2);

class Player extends Phaser.GameObjects.Graphics {
  constructor(params) {
    super(params.scene, params.opt);

    // input
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    // physics
    this.player = this.scene.physics.add.sprite(100, 450, 'dude');
    this.player.setCollideWorldBounds(true);

    this.maxHealth = 10;
    this.health = this.maxHealth;
  }

  update() {
    let direction = {
      x : 0,
      y : 0
    };

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
    this.move(direction);
  }

  move(direction) {
    const speed = 160;
    if (direction.x !== 0 && direction.y !== 0) {
      direction.x *= ONE_OVER_SQRT_TWO;
      direction.y *= ONE_OVER_SQRT_TWO;
    }

    this.player.setVelocityX(speed * direction.x);
    this.player.setVelocityY(speed * direction.y);
  }

  kill() {
    console.log("You're dead!");
  }

  damage(amount) {
    this.health = this.health - amount;
    if (this.health <= 0) {
      kill();
    }
  }

  heal(amount) {
    this.health = Math.max(this.health + amount, this.maxHealth);
  }
}

export default Player;
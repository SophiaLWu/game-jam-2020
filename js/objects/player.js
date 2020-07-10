class Player extends Phaser.GameObjects.Graphics {
  constructor(params) {
    super(params.scene, params.opt);

    // input
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    // physics
    this.player = this.scene.physics.add.sprite(100, 450, 'dude');
    this.player.setCollideWorldBounds(true);
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
    this.player.setVelocityX(speed * direction.x);
    this.player.setVelocityY(speed * direction.y);
  }
}

export default Player;
class Player extends Phaser.GameObjects.Graphics {
  constructor(params) {
    super(params.scene, params.opt);

    // input
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    // physics
    this.player = this.scene.physics.add.sprite(100, 450, 'dude');
    this.player.body.setGravityY(300);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.moveLeft();
    } else if (this.cursors.right.isDown) {
      this.moveRight();
    } else {
      this.turn();
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-450);
    }
  }

  moveLeft() {
    this.player.setVelocityX(-160);
    this.player.anims.play('left', true);
  }

  moveRight() {
    this.player.setVelocityX(160);
    this.player.anims.play('right', true);
  }

  turn() {
    this.player.setVelocityX(0);
    this.player.anims.play('turn');
  }
}

export default Player;
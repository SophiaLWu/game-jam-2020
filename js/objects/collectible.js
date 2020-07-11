import { CONSTANTS } from "../constants.js"

class Collectible extends Phaser.GameObjects.Image {
  constructor(params) {
    super(params.scene, params.x, params.y, params.texture, params.frame);

    // input
    // this.cursors = this.scene.input.keyboard.createCursorKeys();

    // physics
    this.collectible = this.scene.physics.add.image(this.x, this.y, this.texture.key);
  }

  update() {
  }

  onCollision() {
    this.collectible.disableBody(true, true);
  }
}

export default Collectible;
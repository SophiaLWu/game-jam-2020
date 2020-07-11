import { CONSTANTS } from "../constants.js"
import Collectible from "./collectible.js";

class Food extends Collectible {
  constructor(params) {
    super(params);

    // physics
    this.physicsBody = this.scene.physics.add.image(this.x, this.y, this.texture.key);
  }

  update() {
  }

  onCollision() {
    //super.onCollision();
    this.physicsBody.disableBody(true, true);
    this.scene.stomach_contents = Math.min(this.scene.stomach_contents + 10, CONSTANTS.STOMACH_CONTENTS_MAX);
  }
}

export default Food;
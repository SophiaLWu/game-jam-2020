import { CONSTANTS } from "../constants.js"
import Collectible from "./collectible.js";

class Food extends Collectible {
  constructor(params) {
    super(params);

    // physics
  }

  update() {
  }

  onCollision() {
    super.onCollision();
    this.scene.stomach_contents = Math.min(this.scene.stomach_contents + 10, CONSTANTS.STOMACH_CONTENTS_MAX);
  }
}

export default Food;
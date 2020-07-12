import { CONSTANTS } from "../constants.js"
import { Curves, getTween } from "../utils.js"

/**
 * Graphic for Overlay
 * @extends Phaser.GameObjects.Graphics
 */
class Overlay extends Phaser.GameObjects.Graphics {
  constructor({
    scene
  } = {}) {
    super(scene);

    this.setDepth(Number.MAX_SAFE_INTEGER);
    this.setScrollFactor(0);

    this.targetOpacity = 0;
    this.opacity = 0;
    this.tween = null;

    this.draw();

    scene.add.existing(this);
    this.setActive(true);

    const buffer = CONSTANTS.SCREEN_WIDTH * 0.01;
    this.x = -buffer;
    this.y = -buffer;
    this.width = CONSTANTS.SCREEN_WIDTH + (2 * buffer);
    this.height = CONSTANTS.SCREEN_HEIGHT + (2 * buffer);
  }

  draw() {
    this.clear();

    //  BG
    this.fillStyle(0xff0000, this.opacity);
    this.fillRect(this.x, this.y, this.width, this.height);
  }

  setShow(isShown) {
    this.targetOpacity = isShown ? 1.0 : 0;
  }

  update() {
    if (this.targetOpacity != this.opacity && this.tween == null) {
      const isShow = this.targetOpacity === 1;
      this.setBlendMode(isShow ? 2 : 5);
      this.tween = getTween(
        /* startValue= */ this.opacity * 0.7,
        /* endValue= */ this.targetOpacity,
        /* duration= */ CONSTANTS.OVERLAY_ANIMATE_MILLIS * (isShow ? 2 : 1.4),
        /* curve= */ Curves.EASE_OUT,
        /* onComplete= */ () => {this.tween = null;}
      );
    }

    if (this.tween) {
      this.opacity = this.tween();
    }

    this.draw();
  }
}

export default Overlay;
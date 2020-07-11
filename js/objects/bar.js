const MAX_VALUE = 100;
const MIN_VALUE = 0;
const MAX_DRAW = 96 / 100;

/**
 * Graphic for Bar that can be filled
 * @extends Phaser.GameObjects.Graphics
 */
class Bar extends Phaser.GameObjects.Graphics {
  constructor({
    scene, x, y, barWidth, barHeight, startValue
  } = {}) {
    super(scene);

    this.x = x;
    this.y = y;

    this.barWidth = barWidth;
    this.barHeight = barHeight;


    if (startValue > MAX_VALUE || startValue < MIN_VALUE) {
      throw new Error(`Invalid starting amount arg to Bar class. Must be within range: ${MIN_VALUE} - ${MAX_VALUE}`);
    }
    this.value = startValue;

    this.draw();

    scene.add.existing(this);
    this.setActive(true);
  }

  draw() {
    this.clear();

    //  BG
    this.fillStyle(0x000000);
    this.fillRect(this.x, this.y, this.barWidth, this.barHeight);

    //  Health
    this.fillStyle(0xffffff);
    this.fillRect(this.x + 2, this.y + 2, this.barWidth - 4, this.barHeight - 4);

    if (this.value < 30) {
      this.fillStyle(0xff0000);
    }
    else {
      this.fillStyle(0x00ff00);
    }

    const fillWidth = Math.floor(MAX_DRAW * this.value);

    this.fillRect(this.x + 2, this.y + 2, fillWidth, this.barHeight - 4);
  }

  update(amount) {
    if (amount < MIN_VALUE) {
      this.value = MIN_VALUE;
    } else if (amount > MAX_VALUE) {
      this.value = MAX_VALUE
    } else {
      this.value = amount;
    }

    this.draw();
  }
}

export default Bar;
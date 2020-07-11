import { HITBOXES } from "../hitboxes.js";

let obstacles = null;

function initializeObstacles(physics) {
  obstacles = physics.add.staticGroup();
}

class Obstacle extends Phaser.GameObjects.Graphics {
  constructor(params) {
    super(params.scene, params.opt);

    this.scene = params.scene;
    this.filename = params.filename;

    if (obstacles === null) {
      initializeObstacles(params.scene.physics);
    }

    this.createObstacle(params.x, params.y);
  }

  createObstacle(x, y) {
    const hitbox = HITBOXES[this.filename];
    if (hitbox) {
      x -= hitbox.x;
      y -= hitbox.y;
      const sprite = obstacles.create(x, y, this.filename);
      const xOffset = sprite.displayWidth / 2;
      const yOffset = sprite.displayHeight / 2;
      y += yOffset;
      sprite.x += xOffset;
      sprite.y += yOffset;

      const width = hitbox.x2 - hitbox.x1;
      const height = hitbox.y2 - hitbox.y1;
      sprite.body.setSize(width, height, 0, 0);
      sprite.body.x += xOffset + hitbox.x1;
      sprite.body.y += yOffset + hitbox.y1;

      sprite.setDepth(y);
    }
  }

  update() {
  }
}

Obstacle.getObstacles = () => obstacles;

export default Obstacle;
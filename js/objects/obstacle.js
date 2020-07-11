import { HITBOXES } from "../hitboxes.js";

let obstacles = null;
let townObstacles = null;

function initializeObstacles(physics) {
  obstacles = physics.add.staticGroup();
  townObstacles = physics.add.staticGroup();
}

class Obstacle extends Phaser.GameObjects.Graphics {
  constructor(params) {
    super(params.scene, params.opt);

    this.scene = params.scene;
    this.filename = params.filename;
    this.town = params.town;

    if (obstacles === null) {
      initializeObstacles(params.scene.physics);
    }

    this.createObstacle(params.x, params.y);
  }

  createObstacle(x, y) {
    const hitbox = HITBOXES[this.filename];
    if (hitbox) {
      x -= hitbox.x - hitbox.ox;
      y -= hitbox.y - hitbox.oy;

      let sprite;
      if (this.town) {
        sprite = townObstacles.create(x, y, this.filename);
      } else {
        sprite = obstacles.create(x, y, this.filename);
      }
      
      let width = 0;
      let height = 0;
      if (hitbox.x2) {
        width = Math.abs(hitbox.x2 - hitbox.x1);
        height = Math.abs(hitbox.y2 - hitbox.y1);
      }
      sprite.body.setSize(width, height, 0, 0);
      if (hitbox.x1) {
        const newX = hitbox.x1;
        const newY = hitbox.y1;
        sprite.body.setOffset(newX, newY);
      }
      sprite.body.immovable = true;
      sprite.body.enable = !!hitbox.x1;

      sprite.setDepth(hitbox.x1 ? y + hitbox.oy : 0);
    }
  }

  update() {
  }
}

Obstacle.getObstacles = () => obstacles;
Obstacle.getTownObstacles = () => townObstacles;

export default Obstacle;
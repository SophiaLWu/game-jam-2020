import { CONSTANTS } from "../constants.js";

class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init() {
  }

  preload() {
  }

  create() {
    this.add.text(CONSTANTS.SCREEN_WIDTH / 2, CONSTANTS.SCREEN_HEIGHT / 2, "YO YOU DIED.", { fontSize: '32px', fill: '#fff' });
  }

  update() {
  }
}

export default GameOverScene;

import { CONSTANTS } from "./constants.js"
import GameScene from "./scenes/gameScene.js"
import MainMenuScene from "./scenes/mainMenuScene.js"

const config = {
  type: Phaser.AUTO,
  width: CONSTANTS.SCREEN_WIDTH,
  height: CONSTANTS.SCREEN_HEIGHT,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [MainMenuScene, GameScene]
};

export class Game extends Phaser.Game {
  constructor(config) {
    super(config);
  }
}

window.addEventListener("load", () => {
  var game = new Game(config);
});

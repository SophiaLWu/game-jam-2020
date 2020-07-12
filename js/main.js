import { CONSTANTS } from "./constants.js"
import GameScene from "./scenes/gameScene.js"
import GameOverScene from "./scenes/gameOverScene.js"
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
  scene: [MainMenuScene, GameScene, GameOverScene]
};

let game = null;

export default class Game extends Phaser.Game {
  constructor(config) {
    super(config);
  }
}

Game.toggleSound = () => {
  if (game.sound.mute) {
    game.sound.mute = false;
  } else {
    game.sound.mute = true;
  }
}

window.addEventListener("load", () => {
  game = new Game(config);
});

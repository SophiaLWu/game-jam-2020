import { CONSTANTS } from "../constants.js"

class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenuScene' });
  }

  init() {
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
  }

  preload() {
  }

  create() {
    this.add.text(20, CONSTANTS.height / 2, "Press S to play this sweet sweet game", { fontSize: '32px', fill: '#fff' });
  }

  update() {
    if (this.startKey.isDown) {
      this.scene.start("GameScene");
    }
  }
}

export default MainMenuScene;

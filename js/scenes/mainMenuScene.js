import { CONSTANTS } from "../constants.js"
import Game from "../main.js";

class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('MainMenuScene');
    
  }

  init() {
    this.input.keyboard.once('keyup_S', function(){
      this.scene.start('GameScene');
    }, this);
  }

  preload() {
    this.load.image('keyboard', 'https://sophialwu.github.io/game-jam-2020/assets/keyboard-input.png');
  }

  create() {
    console.warn = () => {};
    console.log = () => {};
    this.add.text(20, CONSTANTS.SCREEN_HEIGHT / 3, "You are a princess with a terrible secret.", { fontSize: '22px', fill: '#fff' });
    this.add.text(20, CONSTANTS.SCREEN_HEIGHT / 3 + 22, "When you get hungry, an evil curse takes hold of you.", { fontSize: '22px', fill: '#fff' });
    this.add.text(20, CONSTANTS.SCREEN_HEIGHT / 3 + 44, "Find food around the village to hold off the curse, and keep your people safe...", { fontSize: '22px', fill: '#fff' });
    this.add.text(20, CONSTANTS.SCREEN_HEIGHT / 3 + 76, "...from yourself...", { fontSize: '32px', fill: '#fff' });
    this.add.text(20, CONSTANTS.SCREEN_HEIGHT / 3 + 140, "Press 's' to start the day", { fontSize: '22px', fill: '#fff' });

    this.add.text(CONSTANTS.SCREEN_WIDTH - 275, CONSTANTS.SCREEN_HEIGHT - 275, "Press 'm' to toggle sound", { fontSize: '16px', fill: "#fff" });
    const keyboard = this.add.image(330, 200, 'keyboard');
  }

  update() {
    this.input.keyboard.once('keydown_M', function(){
      Game.toggleSound();
    }, this);
  }  
}

export default MainMenuScene;

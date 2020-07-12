import { CONSTANTS } from "../constants.js"

class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('MainMenuScene');
    
  }

  init() {
    this.input.keyboard.once('keyup', function(){
      this.scene.start('GameScene');
    }, this);
  }

  preload() {
  }

  create() {
    this.add.text(20, CONSTANTS.SCREEN_HEIGHT / 3, "You are a princess with a terrible secret.", { fontSize: '16px', fill: '#fff' });
    this.add.text(20, CONSTANTS.SCREEN_HEIGHT / 3 + 16, "When you get hungry, an evil curse takes hold of you.", { fontSize: '16px', fill: '#fff' });
    this.add.text(20, CONSTANTS.SCREEN_HEIGHT / 3 + 32, "Find food around the village to hold off the curse, and keep your people safe...", { fontSize: '16px', fill: '#fff' });
    this.add.text(20, CONSTANTS.SCREEN_HEIGHT / 3 + 64, "...from yourself...", { fontSize: '24px', fill: '#fff' });
    this.add.text(20, CONSTANTS.SCREEN_HEIGHT / 3 + 128, "Press any key to start the day", { fontSize: '16px', fill: '#fff' });
  }

  update() {
  }

  
}

export default MainMenuScene;

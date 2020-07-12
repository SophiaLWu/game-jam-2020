import { CONSTANTS } from "../constants.js";

class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene'});
  }

  init(data) {
    this.timeSurvived = new Date(Date.now() - data.timeStarted);
    this.foodEaten = data.foodEaten;
    this.villagersEaten = data.villagersEaten;
    this.restartKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
  }

  preload() {
    this.load.audio('gameEndSound', '../../assets/sound/game_end.mp3');
  }

  create() {
    this.add.text(30, CONSTANTS.SCREEN_HEIGHT / 3, "You have been slain.", { fontSize: '32px', fill: '#fff' });
    this.add.text(30, CONSTANTS.SCREEN_HEIGHT / 3 + 50, `Time Survived: ${this.formatTimeString(this.timeSurvived)}`, { fontSize: '24px', fill: '#fff' });
    this.add.text(30, CONSTANTS.SCREEN_HEIGHT / 3 + 74, `Food Eaten: ${this.foodEaten}`, { fontSize: '24px', fill: '#fff' });
    this.add.text(30, CONSTANTS.SCREEN_HEIGHT / 3 + 98, `Villagers Eaten: ${this.villagersEaten}`, { fontSize: '24px', fill: '#fff' });
    this.add.text(30, CONSTANTS.SCREEN_HEIGHT / 3 + 122, 'Press S to restart', { fontSize: '24px', fill: '#fff' });

    let sfx = this.sound.add('gameEndSound', { volume: 0.3, loop: false });
    sfx.play();
  }

  update() {
  }

  formatTimeString(time){ // Adds zeroes to front of minutes, seconds, milliseconds if needed
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let milliseconds = time.getMilliseconds();
    minutes < 10 ? minutes = '0'+ minutes: minutes = minutes.toString();
    seconds < 10 ? seconds = '0'+ seconds: seconds = seconds.toString();
    if(milliseconds<1000){ // 999 ms -> 0999 ms
      milliseconds = '0' + milliseconds;
      if(milliseconds<100){ // 099 ms -> 0099 ms
        milliseconds = '0' + milliseconds;
        if (milliseconds<10){ // 009 ms -> 0009 ms
          milliseconds = '0' + milliseconds;
        }
      }
    } else{
      milliseconds = milliseconds.toString();
    }
    
    return `${minutes}m:${seconds}s:${milliseconds}ms`;
  }

}

export default GameOverScene;

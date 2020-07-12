import { CONSTANTS } from "../constants.js";
import MainMenuScene from "./mainMenuScene.js";

class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  init(data) {
    
    this.input.keyboard.once('keyup_SPACE', function(){
      this.scene.start('MainMenuScene');
    }, this);
  }

  preload() {
    this.load.audio('gameEndSound', '../../assets/sound/game_end.mp3');
  }
 
  create(data) {
    this.timeSurvived = new Date(Date.now() - data.timeStarted);
    this.foodEaten = data.foodEaten;
    this.villagersEaten = data.villagersEaten;
    const stringTimeSurvived = localStorage.getItem('highScoreTimeSurvived');
    this.highScoreTimeSurvived = new Date(JSON.parse(stringTimeSurvived));
    this.highScoreFoodEaten = localStorage.getItem('highScoreFoodEaten');
    this.highScoreVillagersEaten = localStorage.getItem('highScoreVillagersEaten');
    this.newTimeHighScore = false;
    this.newFoodHighScore = false;
    this.newVillagersHighScore = false;
    this.checkSetHighScores();
    this.add.text(30, CONSTANTS.SCREEN_HEIGHT / 3, "You have been slain.", { fontSize: '32px', fill: '#fff' });
    this.add.text(30, CONSTANTS.SCREEN_HEIGHT / 3 + 50, `Time Survived: ${this.formatTimeString(this.timeSurvived)}`, { fontSize: '24px', fill: '#fff' });
    this.add.text(30, CONSTANTS.SCREEN_HEIGHT / 3 + 74, `Food Eaten: ${this.foodEaten}`, { fontSize: '24px', fill: '#fff' });
    this.add.text(30, CONSTANTS.SCREEN_HEIGHT / 3 + 98, `Villagers Eaten: ${this.villagersEaten}`, { fontSize: '24px', fill: '#fff' });
    if(this.newTimeHighScore) this.add.text(600, CONSTANTS.SCREEN_HEIGHT / 3 + 50, 'New High Score', { fontSize: '24px', fill: '#fff' });
    if(this.newVillagersHighScore) this.add.text(600, CONSTANTS.SCREEN_HEIGHT / 3 + 98, 'New High Score', { fontSize: '24px', fill: '#fff' });
    if(this.newFoodHighScore) this.add.text(600, CONSTANTS.SCREEN_HEIGHT / 3 + 74, 'New High Score', { fontSize: '24px', fill: '#fff' });
    this.add.text(30, CONSTANTS.SCREEN_HEIGHT / 3 + 146, `Time Survived High Score: ${this.formatTimeString(this.timeSurvived)}`, { fontSize: '24px', fill: '#fff' });
    this.add.text(30, CONSTANTS.SCREEN_HEIGHT / 3 + 170, `Food Eaten High Score: ${this.foodEaten}`, { fontSize: '24px', fill: '#fff' });
    this.add.text(30, CONSTANTS.SCREEN_HEIGHT / 3 + 194, `Villagers Eaten High Score: ${this.villagersEaten}`, { fontSize: '24px', fill: '#fff' });
    this.add.text(30, CONSTANTS.SCREEN_HEIGHT / 3 + 266, 'Press Space to restart', { fontSize: '24px', fill: '#fff' });
    let sfx = this.sound.add('gameEndSound', { volume: 0.1, loop: false });
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

  checkSetHighScores(){
    if(this.timeSurvived > this.highScoreTimeSurvived){
      const stringTimeSurvived = JSON.stringify(this.timeSurvived.getTime());
      localStorage.setItem('highScoreTimeSurvived', stringTimeSurvived);
      this.highScoreTimeSurvived = this.timeSurvived;
      this.newTimeHighScore = true;
    }
    if(this.foodEaten > this.highScoreFoodEaten){
      localStorage.setItem('highScoreFoodEaten', this.foodEaten);
      this.highScoreFoodEaten = this.foodEaten;
      this.newFoodHighScore = true;
    }
    if(this.villagersEaten > this.highScoreVillagersEaten){
      localStorage.setItem('highScoreVillagersEaten', this.villagersEaten);
      this.highScoreVillagersEaten = this.villagersEaten;
      this.newVillagersHighScore = true;
    }
  }
}

export default GameOverScene;

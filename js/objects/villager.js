class Villager extends Phaser.GameObjects.Graphics {
  constructor(params) {
    super(params.scene, params.opt);

    this.MoodEnum = {
      SCARED: 1,
      ANGRY: 2
    }

    this.moveVillagerTick = Date.now();
    this.villager = this.scene.physics.add.sprite(this.x, this.y, 'villager');
    this.villager.setCollideWorldBounds(true);
    this.changeVillagerDirection();
    this.mood = this.MoodEnum.SCARED;
  }

  update() {
    this.setVillagerMovement();
  }

  setVillagerMovement() {
    if (Date.now() >= this.moveVillagerTick) {
      this.moveVillagerTick = Date.now() + 1200;
      this.changeVillagerDirection()
    }
  }

  changeVillagerDirection() {
    var directions = ["left", "right", "up", "down"]
    var direction = directions[Math.floor(Math.random() * directions.length)]

    switch(direction) {
      case "left":
        this.villager.setVelocityX(-100);
        this.villager.setVelocityY(0);
        break;
      case "right":
        this.villager.setVelocityX(100);
        this.villager.setVelocityY(0);
        break;
      case "up":
        this.villager.setVelocityX(0);
        this.villager.setVelocityY(100);
        break;
      case "down":
        this.villager.setVelocityX(0);
        this.villager.setVelocityY(-100);
        break;
    }
  }

  isAngry() {
    return this.mood == this.MoodEnum.ANGRY;
  }

  kill() {
    this.villager.disableBody(true, true);
  }
}

export default Villager;
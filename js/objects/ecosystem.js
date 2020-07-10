class Ecosystem extends Phaser.GameObjects.Graphics {
  constructor(params) {
    super(params.scene, params.opt);
    this.food = [];
  }

  update() {
  
  }

  getRandomSpawnLocation() {
    // Eventually randomly generate points around the globe
    return {
      x : Math.random() * 800,
      y : Math.random() * 600,
    };
  }

  onFoodPick() {
    const {x, y} = getRandomSpawnLocation();
    const food = new Collectible(x, y);
  }
}

export default Ecosystem;
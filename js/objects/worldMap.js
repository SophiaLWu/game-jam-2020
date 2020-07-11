import { CONSTANTS } from "../constants.js";
import Obstacle from "./obstacle.js";

const FILE_NAMES = {
  GREEN_APPLE: '41.png',
  RED_APPLE: '42.png',
  rocks: [
    'bigrock.png', // 0
    'snowman.png', // 1
    'block_34.png',
    'block_35.png',
    'log_1.png',
    'log_2.png',
    'log_3.png',
  ],
  grasses: [
    'grass_1.png',
    'grass_2.png',
    'grass_3.png',
    'bush_5.png',
    'bush_6.png',
    'branches_3.png',
  ],
  bushes: [
    'bush_1.png',
    'bush_2.png',
    'bush_3.png',
    'branches_1.png',
    'branches_2.png',
    'plant_1.png',
    'plant_2.png',
    'plant_3.png',
    'plant_4.png',
  ],
  buildings: [
    'hut_1.png',
    'hut_2.png',
    'sign_2.png',
    'sign_3.png',
  ],
  trees: [
    'tree_1.png',
    'tree_2.png',
    'tree_3.png',
    'tree_4.png',
    'tree_5.png',
    'tree_6.png',
    'tree_7.png',
    'tree_8.png',
    'tree_9.png'
  ]
};

class WorldMap {
  constructor(params) {
    this.params = params;
    this.obstacles = [];
    // this.scene = params.scene;
    // this.physics = params.scene.physics;

    const level = [
      [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
      [  0,   1,   2,   3,   4,   5,   6,   7,   8,   9,  10 ],
      [ 11,  12,  13,  14,  15,  16,  17,  18,  19,  20,  21 ],
      [ 22,  23,  24,  25,  26,  27,  28,  29,  30,  31,  32 ],
      [ 33,  34,  35,   0,  13,  14,   0,   0,   0,   0,   0 ],
      [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
      [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
      [  0,   0,  14,  14,  14,  14,  14,   0,   0,   0,  15 ],
      [  0,   0,   0,   0,   0,   0,   0,   0,   0,  15,  15 ],
      [ 35,   0,   0,   0,   0,   0,   0,   0,  15,  15,  15 ],
      [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ]
    ];

    level.forEach((arr, row) => {
      arr.forEach((id, col) => {
        const x = CONSTANTS.OBSTACLE_DISTANCE * col;
        const y = CONSTANTS.OBSTACLE_DISTANCE * row;
        this.createObstacle(id, x, y);
      });
    });

    new Obstacle({scene: params.scene, x: 800, y: 600, filename: 'snowman.png'})
  }

  getObstacles() {
    return Obstacle.getObstacles();
  }

  createObstacle(id, x, y) {
    let filename;

    if (id == 0) {
      return false;
    } else if (id < 8) {
      filename = FILE_NAMES.rocks[id - 1];
    } else if (id < 14) {
      filename = FILE_NAMES.grasses[id - 8];
    } else if (id < 23) {
      filename = FILE_NAMES.bushes[id - 14];
    } else if (id < 27) {
      filename = FILE_NAMES.buildings[id - 14];
    } else if (id < 36) {
      filename = FILE_NAMES.trees[id - 27];
    }
    if (!filename) return false;
    new Obstacle({scene: this.params.scene, x: x, y: y, filename: filename});
    return true;
  }

  //   // When loading from an array, make sure to specify the tileWidth and tileHeight
  //   const map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16 });
  //   const tiles = map.addTilesetImage("mario-tiles");
  //   const layer = map.createStaticLayer(0, tiles, 0, 0);
  // }
}

export default WorldMap;
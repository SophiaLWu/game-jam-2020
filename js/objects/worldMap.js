import { CONSTANTS } from "../constants.js";
import Obstacle from "./obstacle.js";

const FILE_NAMES = {
  GREEN_APPLE: '41.png',
  RED_APPLE: '42.png',
  rocks: [
    'bigrock.png', // 1 - Big border rock
    'snowman.png', // 2 - Snowman
    'block_34.png', // 3 - Small vertical rock
    'block_35.png', // 4 - Small flat rock
    'log_1.png', // 5 - Single hollow log
    'log_2.png', // 6 - Stack o' logs nw to se
    'log_3.png', // 7 - Stack o' log sq to ne
  ],
  grasses: [
    'grass_1.png', // 8 - Dark green grass patch
    'grass_2.png', // 9 - Light green grass patch
    'grass_3.png', // 10 - Three grass clumps
    'bush_5.png', // 11 - Light green single grass clump
    'bush_6.png', // 12 - Teal green single grass clump
    'branches_3.png', // 13 - Fallen tree
  ],
  bushes: [
    'bush_1.png', // 14 - Green bush
    'bush_2.png', // 15 - Light green bush
    'bush_3.png', // 16 - Bush with purple flowers
    'branches_1.png', // 17 - Dead branches clump
    'branches_2.png', // 18 - Dead bracnhes leaning right
    'plant_1.png', // 19 - Petal bush green top view
    'plant_2.png', // 20 - Petal bush pink top view
    'plant_3.png', // 21 - Petal bush green side view
    'plant_4.png', // 22 - Petal bush teal side view
  ],
  buildings: [
    'hut_1.png', // 23 - Hut w/ window
    'hut_2.png', // 24 - Hut w/o window
    'sign_2.png', // 25 - Sign directions
    'sign_3.png', // 26 - Sign text
  ],
  trees: [
    'tree_1.png', // 27 - Squiggle mushroom tree 
    'tree_2.png', // 28 - Big mushroom tree teal
    'tree_3.png', // 29 - Pine tree squiggle
    'tree_4.png', // 30 - No leaf tree
    'tree_5.png', // 31 - Pine tree leaning
    'tree_6.png', // 32 - Pine tree straight
    'tree_7.png', // 33 - Dead tree
    'tree_8.png', // 34 - Small mushroom tree green
    'tree_9.png' // 35 - Small mushroom tree red
  ]
};

class WorldMap {
  constructor(params) {
    this.params = params;
    this.obstacles = [];
    // this.scene = params.scene;
    // this.physics = params.scene.physics;

    const level = [
      [  1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1 ],
      [  1,   1,   2,   3,   4,   5,   6,   7,   8,   9,   1 ],
      [  1,  12,  13,  14,  15,  16,  17,  18,  19,  20,   1 ],
      [  1,  23,  24,  25,  26,  27,  28,  29,  30,  31,   1 ],
      [  1,  34,  35,   0,  13,  14,   0,   0,   0,   0,   1 ],
      [  1,   0,   0,   0,   0,   0,   0,   0,   0,   0,   1 ],
      [  1,   0,   0,   0,   0,   0,   0,   0,   0,   0,   1 ],
      [  1,   0,  14,  14,  14,  14,  14,   0,   0,   0,   1 ],
      [  1,   0,   0,   0,   0,   0,   0,   0,   0,  15,   1 ],
      [  1,   0,   0,   0,   0,   0,   0,   0,  15,  15,   1 ],
      [  1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1 ]
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
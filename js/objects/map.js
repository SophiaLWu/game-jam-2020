const FILE_NAMES = {
  GREEN_APPLE: '41.png',
  RED_APPLE: '42.png',
  rocks: [
    'bigrock.png',
    'snowman.png',
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
    super(params.scene, params.opt);
    this.scene = params.scene;
    this.physics = params.scene.physics;
  }

  // create() {
  //   // Load a map from a 2D array of tile indices
  //   const level = [
  //     [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
  //     [  0,   1,   2,   3,   0,   0,   0,   1,   2,   3,   0 ],
  //     [  0,   5,   6,   7,   0,   0,   0,   5,   6,   7,   0 ],
  //     [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
  //     [  0,   0,   0,  14,  13,  14,   0,   0,   0,   0,   0 ],
  //     [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
  //     [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
  //     [  0,   0,  14,  14,  14,  14,  14,   0,   0,   0,  15 ],
  //     [  0,   0,   0,   0,   0,   0,   0,   0,   0,  15,  15 ],
  //     [ 35,  36,  37,   0,   0,   0,   0,   0,  15,  15,  15 ],
  //     [ 39,  39,  39,  39,  39,  39,  39,  39,  39,  39,  39 ]
  //   ];

  //   // When loading from an array, make sure to specify the tileWidth and tileHeight
  //   const map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16 });
  //   const tiles = map.addTilesetImage("mario-tiles");
  //   const layer = map.createStaticLayer(0, tiles, 0, 0);
  // }
}

export default WorldMap;
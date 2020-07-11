const HITBOXES = {
  '41.png': { // Red Apple
    ox: 13, // x-center of image
    oy: 17, // y-center of image
    x: 13, // x-center of place on ground
    y: 28, // y-center of place on ground
    x1: 0, // top-x left corner of hitbox
    y1: 0, // top-y left corner of hitbox
    x2: 25, // bottom-x right corner of hitbox
    y2: 31 // bottom-y right corner of hitbox
  },
  '42.png': { // Green Apple
    ox: 35,
    oy: 35,
    x: 35,
    y: 49,
    x1: 9,
    y1: 14,
    x2: 58,
    y2: 62
  },
  'bigrock.png': {
    ox: 192,
    oy: 120,
    x: 210,
    y: 239,
    x1: 45,
    y1: 20,
    x2: 362,
    y2: 341
  },
  'block_34.png': {
    ox: 94,
    oy: 105,
    x: 90,
    y: 146,
    x1: 29,
    y1: 80,
    x2: 162,
    y2: 181
  },
  'block_35.png': {
    ox: 113,
    oy: 82,
    x: 105,
    y: 82,
    x1: 19,
    y1: 55,
    x2: 198,
    y2: 134
  },
  'branches_1.png': {
    ox: 64,
    oy: 92,
    x: 46,
    y: 106,
    x1: 20,
    y1: 105,
    x2: 90,
    y2: 106
  },
  'branches_2.png': {
    ox: 25,
    oy: 96,
    x: 22,
    y: 111,
    x1: 5,
    y1: 111,
    x2: 53,
    y2: 111
  },
  'branches_3.png': {
    ox: 128,
    oy: 64,
    x: 130,
    y: 64
  },
  'bush_1.png': {
    ox: 128,
    oy: 64,
    x: 132,
    y: 68,
    x1: 67,
    y1: 57,
    x2: 199,
    y2: 85
  },
  'bush_2.png': {
    ox: 93,
    oy: 64,
    x: 97,
    y: 68,
    x1: 48,
    y1: 57,
    x2: 185,
    y2: 85
  },
  'bush_3.png': {
    ox: 64,
    oy: 64,
    x: 62,
    y: 90,
    x1: 30,
    y1: 55,
    x2: 111,
    y2: 85
  },
  'bush_5.png': {
    ox: 64,
    oy: 64,
    x: 63,
    y: 68
  },
  'bush_6.png': {
    ox: 64,
    oy: 64,
    x: 60,
    y: 55
  },
  'grass_1.png': {
    ox: 64,
    oy: 64,
    x: 62,
    y: 82,
  },
  'grass_2.png': {
    ox: 64,
    oy: 64,
    x: 62,
    y: 82,
  },
  'grass_3.png': {
    ox: 128,
    oy: 64,
    x: 118,
    y: 73,
  },
  'hut_1_small.png': {
    ox: 128,
    oy: 105,
    x: 143,
    y: 120,
    x1: 24,
    y1: 103,
    x2: 226,
    y2: 213
  },
  'hut_2_small.png': {
    ox: 128,
    oy: 120,
    x: 124,
    y: 198,
    x1: 20,
    y1: 97,
    x2: 229,
    y2: 220
  },
  'log_1.png': {
    ox: 128,
    oy: 70,
    x: 126,
    y: 70,
    x1: 68,
    y1: 50,
    x2: 184,
    y2: 90
  },
  'log_2.png': {
    ox: 128,
    oy: 64,
    x: 126,
    y: 72,
    x1: 63,
    y1: 48,
    x2: 201,
    y2: 96
  },
  'log_3.png': {
    ox: 128,
    oy: 64,
    x: 142,
    y: 68,
    x1: 80,
    y1: 50,
    x2: 204,
    y2: 95
  },
  'plant_1.png': {
    ox: 64,
    oy: 64,
    x: 66,
    y: 70,
    x1: 41,
    y1: 60,
    x2: 88,
    y2: 81
  },
  'plant_2.png': {
    ox: 64,
    oy: 64,
    x: 66,
    y: 70,
    x1: 41,
    y1: 60,
    x2: 88,
    y2: 81
  },
  'plant_3.png': {
    ox: 64,
    oy: 64,
    x: 54,
    y: 79,
  },
  'plant_4.png': {
    ox: 64,
    oy: 64,
    x: 54,
    y: 79,
  },
  'sign_2.png': {
    ox: 64,
    oy: 80,
    x: 69,
    y: 106,
    x1: 67,
    y1: 95,
    x2: 98,
    y2: 95
  },
  'sign_3.png': {
    ox: 64,
    oy: 75,
    x: 67,
    y: 102,
    x1: 45,
    y1: 75,
    x2: 116,
    y2: 80
  },
  'snowman.png': {
    ox: 128,
    oy: 102,
    x: 145,
    y: 165,
    x1: 100,
    y1: 140,
    x2: 195,
    y2: 195
  },
  'tree_1.png': {
    ox: 192,
    oy: 205,
    x: 190,
    y: 350,
    x1: 170,
    y1: 325,
    x2: 220,
    y2: 340
  },
  'tree_2.png': {
    ox: 192,
    oy: 185,
    x: 195,
    y: 338,
    x1: 162,
    y1: 320,
    x2: 253,
    y2: 345
  },
  'tree_3.png': {
    ox: 128,
    oy: 215,
    x: 130,
    y: 359,
    x1: 102,
    y1: 348,
    x2: 140,
    y2: 350
  },
  'tree_4.png': {
    ox: 64,
    oy: 215,
    x: 64,
    y: 363,
    x1: 64,
    y1: 353,
    x2: 88,
    y2: 357
  },
  'tree_5.png': {
    ox: 128,
    oy: 215,
    x: 131,
    y: 356,
    x1: 123,
    y1: 350,
    x2: 160,
    y2: 355
  },
  'tree_6.png': {
    ox: 128,
    oy: 192,
    x: 121,
    y: 359,
    x1: 110,
    y1: 351,
    x2: 150,
    y2: 361
  },
  'tree_7.png': {
    ox: 64,
    oy: 150,
    x: 47,
    y: 234,
    x1: 38,
    y1: 222,
    x2: 65,
    y2: 225
  },
  'tree_8.png': {
    ox: 128,
    oy: 128,
    x: 137,
    y: 216,
    x1: 145,
    y1: 215,
    x2: 149,
    y2: 215
  },
  'tree_9.png': {
    ox: 128,
    oy: 128,
    x: 156,
    y: 216,
    x1: 160,
    y1: 209,
    x2: 164,
    y2: 209
  },
};

export { HITBOXES };
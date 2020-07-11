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
    oy: 192,
    x: 210,
    y: 239,
    x1: 45,
    y1: 1,
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
    oy: 126,
    x: 105,
    y: 82,
    x1: 19,
    y1: 49,
    x2: 189,
    y2: 134
  },
  'branches_1.png': {
    ox: 64,
    oy: 64,
    x: 46,
    y: 106,
    x1: 20,
    y1: 89,
    x2: 90,
    y2: 117
  },
  'branches_2.png': {
    ox: 64,
    oy: 64,
    x: 22,
    y: 113,
    x1: 5,
    y1: 96,
    x2: 53,
    y2: 122
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
    y1: 39,
    x2: 192,
    y2: 95
  },
  'bush_2.png': {
    ox: 93,
    oy: 64,
    x: 97,
    y: 68,
    x1: 42,
    y1: 39,
    x2: 177,
    y2: 95
  },
  'bush_3.png': {
    ox: 64,
    oy: 64,
    x: 62,
    y: 90,
    x1: 19,
    y1: 38,
    x2: 111,
    y2: 103
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
    oy: 128,
    x: 143,
    y: 120,
    x1: 24,
    y1: 108,
    x2: 226,
    y2: 213
  },
  'hut_2_small.png': {
    ox: 128,
    oy: 128,
    x: 124,
    y: 198,
    x1: 20,
    y1: 102,
    x2: 229,
    y2: 229
  },
  'log_1.png': {
    ox: 128,
    oy: 128,
    x: 126,
    y: 65,
    x1: 68,
    y1: 37,
    x2: 184,
    y2: 94
  },
  'log_2.png': {
    ox: 128,
    oy: 64,
    x: 126,
    y: 72,
    x1: 59,
    y1: 35,
    x2: 201,
    y2: 114
  },
  'log_3.png': {
    ox: 128,
    oy: 64,
    x: 142,
    y: 68,
    x1: 69,
    y1: 33,
    x2: 199,
    y2: 102
  },
  'plant_1.png': {
    ox: 64,
    oy: 64,
    x: 66,
    y: 70,
    x1: 41,
    y1: 46,
    x2: 86,
    y2: 86
  },
  'plant_2.png': {
    ox: 64,
    oy: 64,
    x: 66,
    y: 70,
    x1: 41,
    y1: 46,
    x2: 86,
    y2: 86
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
    oy: 64,
    x: 69,
    y: 106,
    x1: 32,
    y1: 49,
    x2: 106,
    y2: 114
  },
  'sign_3.png': {
    ox: 64,
    oy: 64,
    x: 67,
    y: 102,
    x1: 25,
    y1: 47,
    x2: 107,
    y2: 116
  },
  'snowman.png': {
    ox: 128,
    oy: 128,
    x: 145,
    y: 165,
    x1: 100,
    y1: 142,
    x2: 186,
    y2: 195
  },
  'tree_1.png': {
    ox: 192,
    oy: 192,
    x: 190,
    y: 350,
    x1: 149,
    y1: 306,
    x2: 210,
    y2: 365
  },
  'tree_2.png': {
    ox: 192,
    oy: 192,
    x: 195,
    y: 338,
    x1: 149,
    y1: 303,
    x2: 243,
    y2: 365
  },
  'tree_3.png': {
    ox: 128,
    oy: 192,
    x: 115,
    y: 359,
    x1: 88,
    y1: 329,
    x2: 132,
    y2: 369
  },
  'tree_4.png': {
    ox: 64,
    oy: 192,
    x: 64,
    y: 363,
    x1: 44,
    y1: 333,
    x2: 82,
    y2: 373
  },
  'tree_5.png': {
    ox: 128,
    oy: 192,
    x: 131,
    y: 356,
    x1: 103,
    y1: 318,
    x2: 150,
    y2: 375
  },
  'tree_6.png': {
    ox: 128,
    oy: 192,
    x: 121,
    y: 359,
    x1: 99,
    y1: 321,
    x2: 138,
    y2: 371
  },
  'tree_7.png': {
    ox: 64,
    oy: 128,
    x: 47,
    y: 234,
    x1: 26,
    y1: 205,
    x2: 61,
    y2: 244
  },
  'tree_8.png': {
    ox: 128,
    oy: 128,
    x: 137,
    y: 216,
    x1: 126,
    y1: 197,
    x2: 146,
    y2: 222
  },
  'tree_9.png': {
    ox: 128,
    oy: 128,
    x: 156,
    y: 216,
    x1: 135,
    y1: 181,
    x2: 162,
    y2: 218
  },
};

export { HITBOXES };
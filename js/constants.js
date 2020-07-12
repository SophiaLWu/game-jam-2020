const CONSTANTS = {
  BAR_ANIMATION_DURATION_MILLIS: 230,
  FOOD_BOUND_BORDER: 400,
  FOOD_FIND_DELAY_MILLIS_MIN: 400,
  FOOD_FIND_DELAY_MILLIS_MAX: 1300,
  MIN_SPAWN_DISTANCE: 200,
  ONE_OVER_SQRT_TWO: 1.0/Math.sqrt(2),
  SCARE_VILLAGER_RANGE: 500,
  SCREEN_HEIGHT: 600,
  SCREEN_WIDTH: 800,
  STOMACH_CONTENTS_MAX: 100,
  STOMACH_CONTENTS_STARTING: 40,
  STARTING_FOOD_AMOUNT: 15,
  STARTING_VILLAGER_AMOUNT: 30,
  STUCK_WALK_DURATION: 1000,
  VILLAGER_DAMAGE_TO_PLAYER: 1,
  VILLAGER_SPAWN_COUNT_UPON_DEATH: 1,
  VILLAGER_SPAWN_COUNT_UPON_SCARED_VILLAGER_RETURNING: 1,
  VILLAGE_X: 800,
  VILLAGE_Y: 650,
  WORLD_WIDTH: 3000,
  WORLD_HEIGHT: 3000
};

const MoodEnum = {
  NORMAL: 0,
  SCARED: 1,
  ANGRY: 2
};

export { CONSTANTS, MoodEnum };
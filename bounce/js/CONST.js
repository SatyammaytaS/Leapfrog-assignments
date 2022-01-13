export const GRAVITY = 0.03;
export const JUMP_FORCE = 0.16;
export const DEBUG_DRAW = true;
export const BOUNCE_FACTOR = 0.7;
export const  SYMBOL_TO_SPRITESHEET_COORDS = {
    // format [pos_x, pos_y, width, height]
  S: [0, 0, 12, 12], // SKY
  B: [24, 0, 12, 12], //BRICK
  D: [24, 72, 12, 12], //DIAMOND
  A: [48, 72, 12, 12], //ARROW
  U: [48, 0, 12, 12], //UP_BRICK
  L: [72, 0, 12, 12], //LOW_BRICK
  W: [0, 24, 12, 12], //WATER
  Z: [0, 48, 12, 12], //SIZE_CHANGE_FROM_SMALL_TO_BIG
  Y: [24, 48, 12, 12], // " BUT_UNDERWATER
  O: [48, 48, 12, 12], //SIZE_CHANGE_FROM_BIG_TO_SMALL
  X: [72, 48, 12, 12], // " BUT_UNDERWATER
  H: [0, 72, 12, 12], // EXTRA_HEALTH
  J: [24, 24, 12, 12], //JUMP_HIGH_BRICK
  I: [0, 96, 12, 12], //OBSTRACLE_1_METAL_THRONE
  G: [12, 132, 6, 22], //Gate_UNOPENED
  //C: []


  P: [0, 120, 12, 12],
  Q : [24, 120, 12, 12],
  E: [72, 120, 12, 12],



};


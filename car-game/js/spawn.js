/** Represents a item spawn
 * @constructor
 * @param {number} laneIdx
 * @param {string} imagePath
 */
var Spawn = function (laneIdx, imagePath) {
  this.image = new Image();
  this.image.src = imagePath;
  this.width = SPAWN_WIDTH;
  this.height = SPAWN_HEIGHT;
  this.x = (LANE_WIDTH - this.width) / 2 + LANE_WIDTH * laneIdx;
  this.y = 0;
};

/**
 * draw spawn
 * @param {CanvasRenderingContext2D} ctx
 */
Spawn.prototype.draw = function (ctx) {
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};

/** update spawn
 * @param {number} speed
 */
Spawn.prototype.update = function (speed) {
  this.y += speed;
};

/**
 * checks if spawn item is out of screen or not
 * @returns {boolean} whether or not item is out of screen
 */
Spawn.prototype.isOutOfScreen = function () {
  return this.y >= CANVAS_HEIGHT;
};
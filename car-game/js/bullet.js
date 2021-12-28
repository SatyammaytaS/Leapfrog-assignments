/**
 * Represents a bullet
 * @constructor
 * @param {number} laneIdx
 */
var Bullet = function (laneIdx) {
  this.width = BULLET_WIDTH;
  this.height = BULLET_HEIGHT;
  this.x = (LANE_WIDTH - this.width) / 2 + LANE_WIDTH * laneIdx;
  this.y = CANVAS_HEIGHT - CAR_HEIGHT - BULLET_CAR_OFFSET;
  this.image = new Image();
  this.image.src = './images/bullet.png';
};

/**
 * draw bullet
 * @param {CanvasRenderingContext2D} ctx
 */
Bullet.prototype.draw = function (ctx) {
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};

/** update bullet
 * @param {number} speed
 */
Bullet.prototype.update = function (speed) {
  this.y -= speed;
};

/**
 * checks if bullet is out of screen or not
 * @returns {boolean} whether or bullet is out of screen
 */
Bullet.prototype.isOutOfScreen = function () {
  return this.y < 0;
};
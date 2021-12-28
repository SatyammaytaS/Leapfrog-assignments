/**
 * @constructor
 * @param {boolean} isPlayer
 * @param {number} laneIdx
 * @param {number} y
 */
function Car(isPlayer, laneIdx, y) {
  this.isPlayer = isPlayer;
  this.image = new Image();
  this.image.src = './images/car2.png';
  if (this.isPlayer) {
    this.image.src = './images/car.png';
  }
  if (laneIdx === undefined) {
    laneIdx = 0;
  }
  this.width = CAR_WIDTH;
  this.height = CAR_HEIGHT;
  this.x = (LANE_WIDTH - this.width) / 2 + LANE_WIDTH * laneIdx;
  this.y = y !== undefined || CANVAS_HEIGHT - this.height;
  this.lane = laneIdx;
  if (this.isPlayer) {
    this.addControls();
  }
}

/**
 * Draw car on canvas
 * @param {CanvasRenderingContext2D} ctx
 */
Car.prototype.draw = function (ctx) {
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};

/** Attach controls to car */
Car.prototype.addControls = function () {
  var handleKeyDown = function (ev) {
    if (ev.key === 'ArrowLeft' || ev.key.toLowerCase() === 'a') {
      if (this.lane <= 0) {
        return;
      }
      this.lane--;
      this.x -= LANE_WIDTH;
    }
    if (ev.key === 'ArrowRight' || ev.key.toLowerCase() === 'd') {
      if (this.lane >= 2) {
        return;
      }
      this.lane++;
      this.x += LANE_WIDTH;
    }
  };
  document.addEventListener('keydown', handleKeyDown.bind(this));
};

/**
 * Update car
 */
Car.prototype.update = function (speed) {
  if (this.isPlayer) {
    return;
  }
  this.y += speed;
};

/**
 * checks if car is out of screen or not
 * @returns {boolean} whether or not car is out of screen
 */
Car.prototype.isOutOfScreen = function () {
  return this.y >= CANVAS_HEIGHT;
};

/**checks if given object is colliding with this car
 * @param {object} car
 * @returns {boolean}
 */
Car.prototype.isColliding = function (other) {
  return (
    this.x < other.x + other.width &&
    this.x + this.width > other.x &&
    this.y < other.y + other.height &&
    this.y + this.height > other.y
  );
};
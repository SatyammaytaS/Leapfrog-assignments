/**
 * @constructor
 * @param {CanvasRenderingContext2D} ctx - Drawing context of canvas
 * @param {number} width - width of canvas
 * @param {number} height - height of canvas
 */

var Game = function (ctx, width, height) {
  this.ctx = ctx;
  this.width = width;
  this.height = height;
  this.ctx.canvas.width = this.width;
  this.ctx.canvas.height = this.height;
  this.addStartListener();
  this.gameStarted = false;
  this.gameOver = false;
};

/**initialize the game */
Game.prototype.gameInit = function () {
  this.highScore = parseInt(localStorage.getItem('highScore')) || 0;
  this.ctx.globalCompositeOperation = 'source-over';
  this.speed = INITIAL_SPEED;
  this.laneLineOffset = 0;
  this.player = new Car(true, 1);
  this.obstacles = [];
  this.obstacleInterval = setInterval(
    this.addObstacle.bind(this),
    OBSTACLE_DELAY
  );
  this.score = 0;
  this.bullets = [];
  this.ammo = 0;
  this.spawns = [];
  this.spawnInterval = setInterval(this.spawnAmmo.bind(this), SPAWN_INTERVAL);
  this.fireHandler = this.handleFire.bind(this);
  document.addEventListener('keydown', this.fireHandler);
  this.gameStarted = true;
  this.gameOver = false;
};

/** play the game */
Game.prototype.play = function () {
  this.gameAnimationId = requestAnimationFrame(this.play.bind(this));
  if (!this.gameStarted) {
    this.showHomeScreen();
    return;
  }
  if (this.gameOver) {
    this.showEndScreen();
    return;
  }
  this.clear();
  this.drawLanes();
  this.drawEntities();
  this.handleCollision();
  this.showInfo();
  this.speed += ACCELERATION;
};

/** clear screen */
Game.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.width, this.height);
  this.ctx.fillStyle = '#444';
  this.ctx.fillRect(0, 0, this.width, this.height);
};

/** Draw a list of objects
 * @param {Array.<Object>} objs
 * @param {Function} outOfScreenHandler - function that specifies what to do when a single object of the screen
 */
Game.prototype.drawList = function (objs, outOfScreenHandler) {
  for (var i = 0; i < objs.length; i++) {
    objs[i].draw(this.ctx);
    objs[i].update(this.speed);
    if (objs[i].isOutOfScreen()) {
      if (outOfScreenHandler) {
        outOfScreenHandler();
      }
      objs.splice(i, 1);
    }
  }
};

/** draw player, obstacles,bullets and spawns */
Game.prototype.drawEntities = function () {
  this.player.draw(this.ctx);
  this.drawList(this.obstacles, this.updateScore.bind(this));
  this.drawList(this.bullets);
  this.drawList(this.spawns);
};

/** update score and high score if needed */
Game.prototype.updateScore = function () {
  this.score++;
  if (this.score > this.highScore) {
    this.highScore = this.score;
    localStorage.setItem('highScore', this.highScore);
  }
};

/** show score , highscore and ammo */
Game.prototype.showInfo = function () {
  this.ctx.fillStyle = '#fff';
  this.ctx.font = '20px Georgia';
  this.ctx.fillText('Score: ' + this.score, 80, 20);
  this.ctx.fillText('Ammo: ' + this.ammo, 250, 20);
  this.ctx.fillText('High Score: ' + this.highScore, CANVAS_WIDTH - 80, 20);
};

/** add obstacle car*/
Game.prototype.addObstacle = function () {
  if (this.obstacles.length > 2) {
    return;
  }
  for (var i = 0; i < this.obstacles.length; i++) {
    //make sure that there is a big enough distance to get through between 2 cars
    if (this.obstacles[i].y <= 2.5 * CAR_HEIGHT) {
      return;
    }
  }
  var laneIdx = Math.floor(Math.random() * 3);
  var laneIdxSum = laneIdx;
  for (var i = 0; i < this.obstacles.length; i++) {
    laneIdxSum += this.obstacles[i].lane;
  }
  // if there is an obstacle on each lane with this new obstacle, discard it and add another obstacle recursively
  if (laneIdxSum === 3) {
    this.addObstacle();
    return;
  }
  this.obstacles.push(new Car(false, laneIdx, 0));
};

/** draw lanes on canvas */
Game.prototype.drawLanes = function () {
  this.ctx.strokeStyle = '#fff';
  this.ctx.lineWidth = 5;
  this.ctx.setLineDash([60, 20]);
  this.ctx.lineDashOffset = -this.speed * this.laneLineOffset;
  var numLanes = 3;
  for (var i = 1; i <= numLanes - 1; i++) {
    this.ctx.beginPath();
    this.ctx.moveTo((i / numLanes) * this.width, 0);
    this.ctx.lineTo((i / numLanes) * this.width, this.height);
    this.ctx.stroke();
  }
  this.laneLineOffset++;
};

/** handle different types of collisions */
Game.prototype.handleCollision = function () {
  this.handleObstacleCollision();
  this.handleSpawnCollision();
  this.handleBulletCollision();
};

/** handle collision with other cars */
Game.prototype.handleObstacleCollision = function () {
  for (var i = 0; i < this.obstacles.length; i++) {
    if (this.player.isColliding(this.obstacles[i])) {
      clearInterval(this.obstacleInterval);
      this.endGame();
    }
  }
};

//** handle collision with spawnable items */
Game.prototype.handleSpawnCollision = function () {
  for (var i = 0; i < this.spawns.length; i++) {
    if (this.player.isColliding(this.spawns[i])) {
      this.spawns.splice(i, 1);
      this.ammo++;
    }
  }
};

/** handle collision between bullets and obstacles */
Game.prototype.handleBulletCollision = function () {
  for (var i = 0; i < this.bullets.length; i++) {
    for (var j = 0; j < this.obstacles.length; j++) {
      if (this.obstacles[j].isColliding(this.bullets[i])) {
        this.bullets.splice(i, 1);
        this.obstacles.splice(j, 1);
        this.updateScore();
      }
    }
  }
};

/** Spawn ammo to collect on lane with no obstacle*/
Game.prototype.spawnAmmo = function () {
  var laneIdxs = [];
  for (var i = 0; i < this.obstacles.length; i++) {
    laneIdxs.push(this.obstacles[i].lane);
  }
  var freeLaneIdx;
  [0, 1, 2].forEach(function (val) {
    if (!laneIdxs.includes(val)) {
      freeLaneIdx = val;
      return;
    }
  });
  this.spawns.push(new Spawn(freeLaneIdx, './images/bullet.png'));
};

/** Fire a bullet if space bar is pressed
 * @param {KeyboardEvent} ev
 */
Game.prototype.handleFire = function (ev) {
  if (ev.key === ' ') {
    if (this.ammo > 0) {
      this.bullets.push(new Bullet(this.player.lane));
      this.ammo--;
    }
  }
};

/** Show home screen*/
Game.prototype.showHomeScreen = function () {
  this.clear();
  this.ctx.font = '40px Georgia';
  this.ctx.fillStyle = '#fff';
  this.ctx.textAlign = 'center';
  this.ctx.fillText('Car Race', CANVAS_WIDTH / 2, 200);
  this.ctx.font = '20px Georgia';
  this.ctx.fillText('Avoid crashing with other cars. ', CANVAS_WIDTH / 2, 250);
  this.ctx.fillText(
    'Press a or left arrow to go left. ',
    CANVAS_WIDTH / 2,
    280
  );
  this.ctx.fillText(
    'Press d or right arrow to go right. ',
    CANVAS_WIDTH / 2,
    310
  );
  this.ctx.fillText('Press spacebar to shoot. ', CANVAS_WIDTH / 2, 340);
  this.ctx.font = '30px Georgia';
  this.ctx.fillText(
    'Hit "Enter" key to start the game ',
    CANVAS_WIDTH / 2,
    400
  );
};
/** add keyboard listener to start the game */
Game.prototype.addStartListener = function () {
  var that = this;
  var handleGameStart = function (ev) {
    if (ev.key === 'Enter') {
      that.gameInit();
      document.removeEventListener('keydown', handleGameStart);
    }
  };
  document.addEventListener('keydown', handleGameStart);
};

Game.prototype.showEndScreen = function () {
  this.ctx.font = '40px Georgia';
  this.ctx.fillStyle = '#f44';
  this.ctx.textAlign = 'center';
  this.ctx.fillText(
    'Hit "Enter" key to restart',
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT / 2
  );
  this.ctx.globalCompositeOperation = 'destination-over';
};

/** end the game */
Game.prototype.endGame = function () {
  this.gameOver = true;
  clearTimeout(this.obstacleInterval);
  clearTimeout(this.spawnInterval);
  document.removeEventListener('keydown', this.fireHandler);
  this.addStartListener();
};
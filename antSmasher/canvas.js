const BALL_NUMBERS = 10;
const C_WIDTH = 1250;
const C_HEIGHT = 700;
const SPEED = 1;

let canvas = document.getElementById('antSmasher')
canvas.style.background = "#000000"

let context = canvas.getContext("2d")

// for random color only
let generateRandomNumber = () => {
    
  return Math.floor(Math.random() * 255) ;
}
// random RBG generate
let generateRandomColor = () => {
  var red = generateRandomNumber(0, 255);
  var blue = generateRandomNumber(0, 255);
  var green = generateRandomNumber(0, 255);

  return `rgb(${red},${green},${blue})`
}
/**
 * @param {number}  x from ballSpawn
 * @param {number}  y from ballSpawn
 */
class Ball{
    constructor(x, y ){
        this.maxRadius = 50;
        this.minRadius = 5;
        this.x = x;
        this.y = y;
        this.radius = Math.floor(this.minRadius + Math.random()*(this.maxRadius + 1 - this.minRadius));
        this.color = generateRandomColor();
        this.dx = Math.random() < 0.5 ? -1 : 1;
        this.dy = Math.random() < 0.5 ? -1 : 1;

        
        this.image = document.createElement('img');
        this.image.src = './anticon.png'

    }

    /**
     * context draw
     */
    draw(){
        context.beginPath();
        // context.arc(this.x, this.y ,this.radius, 0, 2 * Math.PI);
        // context.fillStyle = this.color;
        context.drawImage(this.image , this.x, this.y, 40, 40);
        context.fill();
    }
     /**
     * ant move and canvas boundary check
     */
    move(){
        this.x = this.x  + this.dx * 1
        this.y = this.y  + this.dy * 1

        if (this.x + 40 >= C_WIDTH || this.x - 40 <= 0) {
        this.dx *= -1;
        }

        if (this.y - 40 <= 0 || this.y + 40 >= C_HEIGHT) {
        this.dy *= -1;
        }
        
    }
}

ball = new Ball();

let ballList = [];

/**
 * 
 * @param {object} ball 
 * 
 * using distance formulae
 */
let collisionDetection = (ball) => {
  for (eachBallFromList in ballList) {
        if((ball.x != ballList[eachBallFromList].x) && (ball.y != ballList[eachBallFromList].y)){
            var newdx = ball.x - ballList[eachBallFromList].x;
            var newdy = ball.y - ballList[eachBallFromList].y;
            var distance = Math.sqrt(newdx * newdx + newdy * newdy);

            if (distance < ball.radius + ballList[eachBallFromList].radius) {
                ball.dx *= -1;
                ball.dy *= -1;
            }
        }
    }
}

/**
   * Spawning of balls based on ball numbers
   * checks colliding while spawning
   */
let ballSpawn = () => {
      for (var i = 0; i < BALL_NUMBERS ; i++) {

        do { 
            x=Math.floor(Math.random() * (C_WIDTH - ball.maxRadius)+ ball.maxRadius);
            y=Math.floor(Math.random() * (C_HEIGHT- ball.maxRadius)+ ball.maxRadius);
            var ball1 = new Ball(x,y);
        }while(isColliding(ball1));

            ballList.push(ball1); 
    }
}

/**
 * 
 * @param {Object} ball 
 * checks while spawning
 */
let isColliding = (ball) => {
  for (eachBallFromBallList in ballList) {
    var dx = ball.x - ballList[eachBallFromBallList].x;
    var dy = ball.y - ballList[eachBallFromBallList].y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < ball.radius + ballList[eachBallFromBallList].radius) {

      return true;
    }
  }

  return false;
}

/**
   * animate
   */
let ballMove = () => {
    
    context.clearRect(0, 0, C_WIDTH, C_HEIGHT);

    ballList.forEach((ball) => {
        
        ball.move();
        ball.draw(); 
        collisionDetection(ball);
        
    });
    
}

canvas.addEventListener('click', (event) => {
  var x = event.clientX;
  var y = event.clientY;

  for (let i = 0; i < ballList.length; i++) {
    var ball_del = ballList[i];
    if (x >= ball_del.x
      && x <= ball_del.x + (ball_del.radius *2)
      && y >= ball_del.y
      && y <= ball_del.y + (ball_del.radius *2)
    ) {
      ballList.splice(i, 1);
      console.log(ballList)
    }
  }
});
ballSpawn(); 
setInterval(ballMove, 1000/60);
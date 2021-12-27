const BALL_NUMBERS = 1000;
const C_WIDTH = 1250;
const C_HEIGHT = 700;
const SPEED = 1;

let canvas = document.getElementById('collision')

let context = canvas.getContext("2d")
canvas.style

let generateRandomNumber = () => {
    
  return Math.floor(Math.random() * 255) ;
}

let generateRandomColor = () => {
  var red = generateRandomNumber(0, 255);
  var blue = generateRandomNumber(0, 255);
  var green = generateRandomNumber(0, 255);

  return `rgb(${red},${green},${blue})`
}

class Ball{
    constructor(x, y ){
        this.maxRadius = 10;
        this.minRadius = 5;
        this.x = x;
        this.y = y;
        this.radius = Math.floor(this.minRadius + Math.random()*(this.maxRadius + 1 - this.minRadius));
        this.color = generateRandomColor();
        this.dx = Math.random() < 0.5 ? -1 : 1;
        this.dy = Math.random() < 0.5 ? -1 : 1;
        console.log(this.dx,this.dy);
        this.mass = 1;

    }

    draw(){
        context.beginPath();
        context.arc(this.x, this.y ,this.radius, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.fill();
    }

    move(){
        this.x = this.x + this.dx * 1
        this.y = this.y + this.dy * 1

        if (this.x + this.radius >= C_WIDTH || this.x - this.radius <= 0) {
        this.dx *= -1;
        }

        if (this.y - this.radius <= 0 || this.y + this.radius >= C_HEIGHT) {
        this.dy *= -1;
        }
        
    }
}
ball = new Ball();

let ballList = [];

let collisionDetection = (ball) => {
  for (eachBallFromList in ballList) {
        if((ball.x != ballList[eachBallFromList].x) && (ball.y != ballList[eachBallFromList].y)){
            var newdx = ball.x - ballList[eachBallFromList].x;
            var newdy = ball.y - ballList[eachBallFromList].y;
            var distance = Math.sqrt(newdx * newdx + newdy * newdy);

            if (distance < ball.radius + ballList[eachBallFromList].radius) {
                // ball.dx *= -1;
                // ball.dy *= -1;
                console.log(ballList)
                elasticCollision(ball, ballList[eachBallFromList]);
            }
        }
    }
}

let rotate = (velocity, angle) => {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };

  return rotatedVelocities;
}

let elasticCollision = (ballA, ballB) => {
  let dxDiff = ballA.dx - ballB.dx;
  let dyDiff = ballA.dy - ballB.dy;

  let xDist = ballB.x - ballA.x;
  let yDist = ballB.y - ballA.y;

  

  if (dxDiff * xDist + dyDiff * yDist >= 0) {
    
    const angle = -Math.atan2(yDist, xDist);

    let m1 = ballA.mass;
    let m2 = ballB.mass;

    let u1 = rotate({
      x: ballA.dx,
      y: ballA.dy
    }, angle);

    let u2 = rotate({
      x: ballB.dx,
      y: ballB.dy
    }, angle);

    const v1 = {
      x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      y: u1.y
    };
    const v2 = {
      x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
      y: u2.y
    };
  
    let vf1 = rotate(v1, -angle);
    let vf2 = rotate(v2, -angle);

    ballA.dx = vf1.x;
    ballA.dy = vf1.y;

    ballB.dx = vf2.x;
    ballB.dy = vf2.y;
    
  }
}


let ballSpawn = () => {
      for (var i = 0; i < BALL_NUMBERS ; i++) {

        do { 
            x = Math.floor(Math.random() * (C_WIDTH - ball.maxRadius *2)+ ball.maxRadius);
            y = Math.floor(Math.random() * (C_HEIGHT- ball.maxRadius *2)+ ball.maxRadius);

            var ball1 = new Ball(x,y);

        }while(isColliding(ball1));

            ballList.push(ball1); 
    }
}

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

let ballMove = () => {
    
    context.clearRect(0, 0, C_WIDTH, C_HEIGHT);

    ballList.forEach((ball) => {
        
        ball.move();
        ball.draw(); 
        collisionDetection(ball);
        
    });
    
}
ballSpawn(); 
setInterval(ballMove, 1000/60);
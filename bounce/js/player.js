const DEFAULT_LIVES = 3
const VEL_HOR = 0.5
const VEL_SLOPE = 1

import { GRAVITY, DEBUG_DRAW, JUMP_FORCE } from './CONST.js'

class Player {

    constructor(posX, posY, image) {
        this.posX = posX
        this.posY = posY
        this.lives = DEFAULT_LIVES
        this.image = image
        this.rectWidth = image.width;
        this.rectHeight = image.height;
        this.velX = 0;
        this.velY = 0;
        this.velSlope = 0;      // > 0 means up (U) slope, < 0 means L slope
        this.jumpY = 0;
        this.accY = GRAVITY;
        this.theta = 0;         // in degrees; this facilitates motion along a slope
        this.onGround = false;
        this._colDir = null ; //1 2 3 4, in counterclockwise order, 1 is to player's right
        this.falling = false;

        this.totVelX = 0;
        this.totVelY = 0;


        this.ctx = null;    //for debug
        this.canvas = null;
    }

    jump() {
        if (this.theta != 0) { return ; }
        if (!self.falling) {

            //this.velY = -JUMP_FORCE;
            this.accY -= JUMP_FORCE;
        }
    }
    //update 
    update(actionState, collisionObjects, canvasContext) {
        this.theta = 0;         //reset angle


        let coffX = 0; //collision offset / margin
        let coffY = 0;

     
    
        if (actionState['go_left']) {
            this.velX = -VEL_HOR;
        } else if (actionState['go_right']) {
            this.velX = VEL_HOR;
        } else {
            this.velX = 0;
        }

        var check_rect = [this.posX, this.posY, this.rectWidth, this.rectHeight]
        this.checkFalling(collisionObjects);
        
        if (this.velY == 0 && actionState['jump']) {
            actionState['jump'] = false
            this.jump();
        } 


        if (this.velY > 0) {
            var check_rect = [this.posX, this.posY + 1, this.rectWidth, this.rectHeight]
            if (this.collisionCheck(check_rect, collisionObjects)) {
                //console.log("Coll1")
                this.accY = 0;
                this.velY = 0;
            }
        }

        if (this.velY < 0) {
            var check_rect = [this.posX, this.posY - 1, this.rectWidth, this.rectHeight]
            if (this.collisionCheck(check_rect, collisionObjects)) {
                //console.log("CollUp")
                this.accY = GRAVITY;
                this.velY = 0;
            }
        }

     
        if (this.falling && this.accY <= 0) {
            if (this.theta == 0) {
                this.accY += GRAVITY; 

            }
        }

        //console.log(this.velY)
        //handling jumping before this
        var check_rect = [this.posX + this.velX * 2, this.posY - 1 , this.rectWidth, this.rectHeight]
        if (this.collisionCheck(check_rect, collisionObjects)) {
            if (this.theta == 0) {
                this.velX = 0;
            }
        }


       // console.log("velY ", this.velY);
        this.velY += this.accY;

    

        this.totVelX = this.velX;
        this.totVelY = this.velY;     //only jumping; gravity accounted for separately

        if (this.theta != 0) {
            this.totVelX = this.velX 
            this.totVelY = (this.theta == 45 ? -1 : 1) * this.totVelX            // NOTE: this means we can't jump on slopes currently
            //this.totVelY = -this.velX *  Math.sin(this.theta * (180 / Math.PI));
        } else {
            console.log("Theta is 0. Are you on a slope?")
        }

        if (this.totVelX != 0 || this.totVelY != 0) {
            console.log("vX = ",  this.totVelX, "vY = ", this.totVelY);

        }
        this.posX += this.totVelX;
        this.posY += this.totVelY;
    }

    checkFalling(collisionObjects) {
        var check_rect = [this.posX, this.posY + 3, this.rectWidth, this.rectHeight];

        if (this.collisionCheck(check_rect, collisionObjects)) {
            this.falling = false; //if you collide when moving 1 pixeldownard, not falling
        } else {
            this.falling = true;
        }
    }

    collisionCheck(my_rect, collisionObjects) {
        for (var i = 0; i < collisionObjects.length; i++) {
            let other_rect = collisionObjects[i].getCollisionRect();
            let type = collisionObjects[i].type;    // B, U, or L

            if (this.actualCollisionCheck(my_rect, other_rect, type)) {
                return true; 
            } 
        }
    }

    actualCollisionCheck(my_rect, other_rect, objtype='B') {
        if (objtype == 'U' || objtype == 'L') {
            return this.actualRectTriangleCheck(my_rect, other_rect, objtype)
        }

        var oX = other_rect[0];
        var oY = other_rect[1];
        var oW = other_rect[2];
        var oH = other_rect[3];

        var mX = my_rect[0];
        var mY = my_rect[1];
        var mW = my_rect[2];
        var mH = my_rect[3];

        if (oX > mX + mW) {
            return false;
        }

        if (oX + oW < mX) {
            return false;
        }

        if (oY > mY + mH) {
            return false;
        }

        if (oY + oH < mY) {
            return false;
        }
        // now we have obviously collided
        // let us further check if we are on the 'ground'
        if (mY + mH >= oY){
            this.onGround = true;
        } 




        return true;
    }

    //Lines are of the form Ax + By = C
    //Here, A = m, B = -1, C = mx_1 - y_1, and m = (y_2-y_1)/(x_2-x_1)
    actualRectTriangleCheck(my_rect, other_rect, objtype)
    {
        
        let [mX, mY, mW, mH] = my_rect
        let [oX, oY, oW, oH] = other_rect

        if (DEBUG_DRAW) {
            this.ctx.strokeStyle = 'orange';
            this.ctx.strokeRect(...my_rect);
        }


        function getLineParams(x1, y1, x2, y2) {
            if (x1 == x2) {
                return [1, 0, 0] // line is in the form y = k   
            }

            let m = (y2-y1)/(x2-x1)
            return [m, -1, m*x1 - y1]
        }

        let rectLines = []
        rectLines.push(getLineParams(mX, mY, mX + mW, mY))  //top line
        rectLines.push(getLineParams(mX + mW, mY, mX + mW, mY + mH))
        rectLines.push(getLineParams(mX + mW, mY + mH, mX, mY + mH))
        rectLines.push(getLineParams(mX, mY + mH, mX, mY))

        let slopeLines = []

        let debugPoints = []

        //get the lines of the target slope, whose segments constitue the sides of a right-angled triangle
                
        //'up' when going from left to right
        if (objtype == 'U') {         
            slopeLines.push(getLineParams(oX, oY + oH, oX + oW, oY + oH)) //left to right
            slopeLines.push(getLineParams(oX + oW, oY + oH, oX + oW, oY)) // up
            slopeLines.push(getLineParams(oX + oW, oY, oX, oY + oH)) //diagonal

            debugPoints.push([oX, oY + oH])
            debugPoints.push([oX + oW, oY + oH])
            debugPoints.push([oX + oW, oY])

            this.ctx.strokeStyle = 'green';



        } else {
            slopeLines.push(getLineParams(oX + oW, oY + oH, oX, oY + oH))
            slopeLines.push(getLineParams(oX, oY + oH, oX, oY))
            slopeLines.push(getLineParams(oX, oY, oX + oW, oY + oH))

            debugPoints.push([oX + oW, oY + oH])
            debugPoints.push([oX, oY + oH])
            debugPoints.push([oX, oY])

            this.ctx.strokeStyle = 'blue';
        }

        //console.log("Starting intersection test")

        if (DEBUG_DRAW) {
            let path=new Path2D();
            path.moveTo(...debugPoints[0]);
            path.lineTo(...debugPoints[1]);
            path.lineTo(...debugPoints[2]);
            path.lineTo(...debugPoints[0]);

            this.ctx.stroke(path);

        }

        //intersection point : 
        for (let line_m of rectLines) {
            for (let line_o of slopeLines) {
                let [A1, B1, C1] = line_m
                let [A2, B2, C2] = line_o
                let delta = A1 * B2 - A2 * B1;

                if (delta == 0) {
                    continue;
                }
                

                //get intersection point
                let  x = (B2 * C1 - B1 * C2) / delta;  
                let  y = (A1 * C2 - A2 * C1) / delta;
                

                //qualifying condition: the point should be at the boundary of the 
                //rect and the traingle i.e. it should (intersect/be contained in ) both
                let cond_1 = (x >= mX) && (x <= (mX + mW)) && (y >= mY) && (y <= (mY + mH));

                let cond_2 = (x >= oX) && (x <= (oX + oW)) && (y >= oY) && (y <= (oY + oH));



                if (cond_1 && cond_2) {

                    if (DEBUG_DRAW) {
                        if (objtype == 'U') {
                            this.ctx.fillStyle = 'purple';
                        } else {
                            this.ctx.fillStyle = 'black';
                        }
                        this.ctx.fillRect(x-2.5, y-2.5, 5, 5);
                    } 
                    if (objtype == 'U') {
                        this.theta = 45;
                    } else {
                        this.theta = 135
                    }
                    console.log("A-HA")
                    return true;
                }

            }
        }

        return false;


    }

    
    draw(canvasContext) {
     
        canvasContext.drawImage(this.image, this.posX, this.posY);
    }

    //draw

}

export { Player };
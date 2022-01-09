const DEFAULT_LIVES = 3
const VEL_HOR = 2

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
        this.onGround = false;
        this._colDir = null ; //1 2 3 4, in counterclockwise order, 1 is to player's right
        this.falling = false;
    }

    jump() {
        if (!self.falling) {
            this.velY = -JUMP_FORCE;
        }
    }
    //update 
    update(actionState, collisionObjects, canvasContext) {
        let coffX = 0; //collision offset / margin
        let coffY = 0;

        // apply jump here

        // if (this.onGround) {
        //     this.velY = 0   ;
    
        if (actionState['go_left']) {
            this.velX = -VEL_HOR;
        } else if (actionState['go_right']) {
            this.velX = VEL_HOR;
        } else {
            this.velX = 0;
        }

        var check_rect = [this.posX, this.posY, this.rectWidth, this.rectHeight]
        if (DEBUG_DRAW) {
            canvasContext.fillStyle = "green";
            canvasContext.strokeRect(...check_rect);
        }

        this.checkFalling(collisionObjects);
        
        if (this.velY == 0 && actionState['jump']) {
            actionState['jump'] = false
            this.jump();
        } 
        //lsowly decrease jump velocity
        if (this.velY < 0) {
            this.velY += GRAVITY;
            if (this.velY > 0) {
                this.velY = 0;
            }
        } else {
            //normal falling
            if (this.falling) {
                this.velY = GRAVITY;
            } else {
                console.log('satyam')
                this.velY = 0;
            }
        }
      
        if (this.velX != 0) {
            var rect = [this.posX + this.velX, this.posY-10, this.rectWidth, this.rectHeight];
            if (this.collisionCheck(rect, collisionObjects)) {
                this.velX = 0;
                console.log("aiya");
            }
        }

        this.posX += this.velX;
        this.posY += this.velY;     //only jumping; gravity accounted for separately

    }

    checkFalling(collisionObjects) {
        var check_rect = [this.posX, this.posY + 1, this.rectWidth, this.rectHeight];
        if (this.collisionCheck(check_rect, collisionObjects)) {
            this.falling = false; //if you collide when moving 1 pixeldownard, not falling
        } else {
            this.falling = true;
        }
    }

    collisionCheck(my_rect, collisionObjects) {
        for (var i = 0; i < collisionObjects.length; i++) {
            let other_rect = collisionObjects[i].getCollisionRect();

            if (this.actualCollisionCheck(my_rect, other_rect)) {
                return true; 
            } 
        }
    }

    actualCollisionCheck(my_rect, other_rect) {
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
        } else {
            this.onGround = false;
        }




        return true;
    }

    
    draw(canvasContext) {
        canvasContext.drawImage(this.image, this.posX, this.posY);
    }

    //draw

}

export { Player };
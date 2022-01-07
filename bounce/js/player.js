const DEFAULT_LIVES = 3
import { GRAVITY } from './CONST.js'

class Player {

    vel = 2;

    constructor(posX, posY, image) {
        this.posX = posX
        this.posY = posY
        this.lives = DEFAULT_LIVES
        this.image = image
    }

    //update 
    update(actionState) {
        if (actionState['go_left']) {
            this.posX -= this.vel;
        }

        if (actionState['go_right']) {
            this.posX += this.vel;
        }

        // this.posY += GRAVITY;
    }

    draw(canvasContext) {
        canvasContext.drawImage(this.image, this.posX, this.posY);
    }

    //draw

}

export { Player };
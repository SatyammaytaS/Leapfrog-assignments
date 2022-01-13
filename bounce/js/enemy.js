class Enemy {
    constructor( posX,  posY, image, type) {
        this.posX = posX;
        this.posY = posY;
        this.rectWidth = image.width;
        this.rectHeight = image.height;
        this.image = image;

        this.direction = 1 ;        //DOWN by defauly
    }
    
    update(bricks) {
        let my_rect = this.getCollisionRect();
        for (let brick of bricks) {
            if (this.actualCollisionCheck(my_rect, brick.getCollisionRect())) {
                this.direction = -this.direction    //reverse direction
                break;
            }
        }

        this.posY += this.direction;
    }

    getCollisionRect() {
        return [this.posX, this.posY, this.rectHeight, this.rectHeight];
    }

    draw(context) {
            context.drawImage(this.image, this.posX, this.posY);
    }

    
    actualCollisionCheck(my_rect, other_rect, objtype='B') {


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
    



        return true;
    }


}

export { Enemy }
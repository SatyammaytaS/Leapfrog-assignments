class Block {
    constructor( posX,  posY, image, type) {
        this.posX = posX;
        this.posY = posY;
        this.rectWidth = image.width;
        this.rectHeight = image.height;

        this.type = type;   // B, U, L are the types

    }

    getCollisionRect() {
        return [this.posX, this.posY, this.rectHeight, this.rectHeight];
    }

}

export { Block }
/**
 * The city background for the game
 */
class Background {
    constructor(sourceX, sourceY, width, height, x, y) {
        this.sourceX = sourceX;
        this.sourceY = sourceY;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }

    /**
     * draw the two backgrounds in the screen to fill the width
     * @param {*} ctx context
     */
    draw(ctx) {
        ctx.drawImage(SPRITE, this.sourceX, this.sourceY, this.width, this.height, this.x, this.y, this.width, this.height);
        ctx.drawImage(SPRITE, this.sourceX, this.sourceY, this.width, this.height, this.x + this.width, this.y, this.width, this.height);
    }
}
/**
 * The 'FLOOR' is the foreground
 */
class ForeGround {
    /**
     * 
     * @param {*} sourceX 
     * @param {*} sourceY 
     * @param {*} width 
     * @param {*} height 
     * @param {*} x 
     * @param {*} y 
     * @param {*} vx : the speed at which the ground moves
     */
    constructor(sourceX, sourceY, width, height, x, y, vx) {
        this.sourceX = sourceX;
        this.sourceY = sourceY;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.vx = vx;
    }

    /**
     * @param {*} ctx Canvas context
     */
    draw(ctx) {
        ctx.drawImage(SPRITE, this.sourceX, this.sourceY, this.width, this.height, this.x, this.y, this.width, this.height);
        ctx.drawImage(SPRITE, this.sourceX, this.sourceY, this.width, this.height, this.x + this.width, this.y, this.width, this.height);
    }

    /**
     * Move the ground when in game state
     * @param {*} gameState State of the game
     */
    update(gameState) {
        if (gameState.current == GAME) {
            this.x = (this.x - this.vx) % (this.width / 2);
        }
    }
}
/**
 * Update the score and maintain the high score
 */
class Score {
    constructor() {
        this.best = parseInt(localStorage.getItem('best')) || 0;
        this.value = 0;
    }


    /**
     * Draw the score and high score depending on game state or game over state
     * @param {*} context 
     * @param {*} state 
     */
    draw(context, state) {
        context.fillStyle = '#ffffff';
        context.strokeStyle = '#000000';

        if (state == GAME) {
            context.lineWidth = 1;
            context.font = '50px FlappyBird';
            context.fillText(this.value, context.canvas.width / 2, 50);
            context.strokeText(this.value, context.canvas.width / 2, 50);
        } else if (state == OVER) {

            context.font = '45px FlappyBird';
            context.fillText(this.value, 222, 189);
            context.strokeText(this.value, 222, 189);

            context.fillText(this.best, 222, 233);
            context.strokeText(this.best, 222, 233);
        }
    }

    /**
     * Set the score back to 0 when starting new game
     */
    reset() {
        this.value = 0;
    }

}
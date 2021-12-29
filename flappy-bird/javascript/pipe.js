/**
 * Controls the incoming pipes
 */
class Pipe {
    /**
     * 
     * @param {*} width 
     * @param {*} height 
     * @param {*} gap : Gap between the pipes
     * @param {*} vx : speed at which the pipe moves
     */
    constructor(width, height, gap, vx) {
        this.pipeArray = [];
        this.width = width;
        this.height = height;
        this.gap = gap;
        this.vx = vx;
    }

    /**
     * Create a pair of  pipes and store it in the pipeArray
     * @param {*} ctx 
     */
    draw(ctx) {
        for (let i = 0; i < this.pipeArray.length; i++) {
            let position = this.pipeArray[i];

            let yTop = position.y;
            let yBottom = position.y + this.height + this.gap;

            //Drawing Top Pipe
            ctx.drawImage(SPRITE, TOP_PIPE_DIMS.sourceX, TOP_PIPE_DIMS.sourceY, this.width, this.height, position.x, yTop, this.width, this.height
            )

            //Drawing Bottom Pipe
            ctx.drawImage(SPRITE, BOTTOM_PIPE_DIMS.sourceX, BOTTOM_PIPE_DIMS.sourceY, this.width, this.height, position.x, yBottom, this.width, this.height
            )
        }
    }

    update(ctx, bird, score, gameState, gameFrame) {
        //no pipe if no game
        if (gameState.current !== GAME) {
            return;
        }

        //Generate a pipe every 100 frames
        if (gameFrame % 100 == 0) {
            this.pipeArray.push({
                x: ctx.canvas.width,
                y: PIPE_MAX_Y_POSITION * (Math.random() + 1),
            })
        }

        /** move the pipe in the opposite direction and delete it if it exists canvas */
        for (let i = 0; i < this.pipeArray.length; i++) {
            let position = this.pipeArray[i];
            this.handleCollision(bird, position, gameState);

            position.x -= this.vx;

            if (position.x + this.width <= -1) {
                this.pipeArray.shift();
                score.value += 1;
                score.best = Math.max(score.value, score.best);
                localStorage.setItem('best', score.best);
            }
        }
    }

    /**
     * Empty the pipe array
     */
    reset() {
        this.pipeArray = [];
    }

    handleCollision(bird, pipePosition, gameState) {
        let yBottomPipe = pipePosition.y + this.height + this.gap;

        //Collision with top pipe
        if (
            bird.x + bird.radius > pipePosition.x &&
            bird.x - bird.radius < pipePosition.x + this.width &&
            bird.y + bird.radius > pipePosition.y &&
            bird.y - bird.radius < pipePosition.y + this.height
        ) {
            gameState.current = OVER;
        }

        //Collision with the bottom pipe
        if (
            bird.x + bird.radius > pipePosition.x &&
            bird.x - bird.radius < pipePosition.x + this.width &&
            bird.y + bird.radius > yBottomPipe &&
            bird.y - bird.radius < yBottomPipe + this.height
        ) {
            gameState.current = OVER;
        }
    }
}
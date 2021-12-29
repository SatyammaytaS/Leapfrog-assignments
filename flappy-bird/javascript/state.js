/**
 * Maintain the state of the  game: start, game and end state.
 */
class State {
    constructor(ctx) {
        this.current = GET_READY;
        GET_READY_DIMS.x = (ctx.canvas.width - GET_READY_DIMS.width) / 2;
        GAME_OVER_DIMS.x = (ctx.canvas.width - GAME_OVER_DIMS.width) / 2;
    }

    /**
     * End State
     * @param {*} ctx 
     * @param {*} state 
     */
    drawGameOver(ctx, state) {
        if (state == OVER) {
            let sX = GAME_OVER_DIMS.sourceX;
            let sY = GAME_OVER_DIMS.sourceY;
            let w = GAME_OVER_DIMS.width;
            let h = GAME_OVER_DIMS.height;
            let x = GAME_OVER_DIMS.x;
            let y = GAME_OVER_DIMS.y;
            ctx.drawImage(SPRITE, sX, sY, w, h, x, y, w, h);
        }
    }

    /**
     * Start State
     * @param {*} ctx 
     * @param {*} state 
     */
    drawGetReady(ctx, state) {
        if (state == GET_READY) {
            let sX = GET_READY_DIMS.sourceX;
            let sY = GET_READY_DIMS.sourceY;
            let w = GET_READY_DIMS.width;
            let h = GET_READY_DIMS.height;
            let x = GET_READY_DIMS.x;
            let y = GET_READY_DIMS.y;
            ctx.drawImage(SPRITE, sX, sY, w, h, x, y, w, h);
        }
    }
}
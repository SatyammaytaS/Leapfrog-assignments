/**
 * Starting point for the application
 * Takes in the canvas Id in the parameter.
 */
class Main {
    constructor(canvasId) {
        var canvas = document.getElementById(canvasId);
        this.ctx = canvas.getContext('2d');

        this.frames = 0;
        /**
         * Initializing all objects
         */
        this.state = new State(this.ctx);
        this.bird = new Bird(50, 150, 34, 26, 12);
        this.pipe = new Pipe(53, 400, 85, 2);
        this.background = new Background(0, 0, 275, 226, 0, canvas.height - 226);
        this.foreground = new ForeGround(276, 0, 224, 112, 0, canvas.height - 112, 2);
        this.score = new Score();

        /**
         * Listening to CLick handlers
         */
        canvas.addEventListener('click', (e) => {
            if (e.target == this.ctx.canvas) {
                switch (this.state.current) {
                    case GET_READY:
                        this.state.current = GAME;
                        break;
                    case GAME:
                        if (this.bird.y - this.bird.radius <= 0) {
                            return;
                        }
                        this.bird.flap();
                        break;
                    case OVER:
                        this.pipe.reset();
                        this.bird.resetSpeed();
                        this.score.reset();
                        this.state.current = GET_READY;
                        break;
                }
            }
        });
    }

    /**
     * Drawing the game to the canvas (calling draw from all objects)
     */
    draw() {
        this.ctx.fillStyle = '#71C5CF';
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.background.draw(this.ctx);
        this.pipe.draw(this.ctx);
        this.foreground.draw(this.ctx);
        this.bird.draw(this.ctx);
        this.state.drawGetReady(this.ctx, this.state.current);
        this.state.drawGameOver(this.ctx, this.state.current);
        this.score.draw(this.ctx, this.state.current);
    }

    /**
     * Update bird, state, and pipes during gameplay
     */
    update() {
        this.bird.update(this.state, this.foreground, this.ctx, this.frames);
        this.foreground.update(this.state);
        this.pipe.update(this.ctx, this.bird, this.score, this.state, this.frames);
    };

    /**
     * Main Loop for the canvas, also counts the number of frames.
     */
    mainLoop() {
        this.update();
        this.draw();
        this.frames++;
        requestAnimationFrame(this.mainLoop.bind(this));
    };
}
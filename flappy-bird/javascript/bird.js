class Bird {
    /**
     * Bird Class to draw the bird in the screen
     * @param {*} x : X Position of the bird
     * @param {*} y : Y Position of the Bird
     * @param {*} width : Width of the bird
     * @param {*} height : Height of bird
     * @param {*} radius : Radius of the Bird
     * 
     * Constructor initializes gravity, jump step, speed, frame variables
     */
    constructor(x, y, width, height, radius) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radius = radius;
        this.frame = 0;
        this.gravity = 0.125;
        this.jump = 2.3;
        this.speed = 0;
        this.rotation = 0;
    }

    /**
     * Animate bird on to the screen
     * @param {*} ctx canvas context
     */
    draw(ctx) {
        let bird = ANIMATION[this.frame];
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(SPRITE, bird.sourceX, bird.sourceY, this.width, this.height, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

    /**
     * Jump the bird when pressed
     */
    flap() {
        this.speed = -this.jump;
    };

    /**
     * Updates the wings of the bird,position of the bird, rotation of the bird
     * @param {*} gameState : Game over, start or running states
     * @param {*} foreground
     * @param {*} ctx : context of canvas
     * @param {*} gameFrame : frame count
     */
    update(gameState, foreground, ctx, gameFrame) {
        if (gameState.current == GET_READY) {
            this.period = FAST_FLAP_TIME;
        } else {
            this.period = SLOW_FLAP_TIME;
        }

        if (gameFrame % this.period == 0) {
            this.frame += 1;
        } else {
            this.frame += 0;
        }

        this.frame = this.frame % ANIMATION.length;

        if (gameState.current == GET_READY) {
            this.y = 150;
            this.rotation = (Math.PI / 180) * 0;
        } else {
            this.speed += this.gravity;
            this.y += this.speed;

            if (this.y + this.height / 2 >= ctx.canvas.height - foreground.height) {
                this.y = ctx.canvas.height - foreground.height - this.height / 2;
                if (gameState.current == GAME) {
                    gameState.current = OVER;
                }
            }

            if (this.speed >= this.jump) {
                this.rotation = (Math.PI / 180) * 90;
                this.frame = 1;
            } else {
                this.rotation = (Math.PI / 180) * -25;
            }
        }
    }

    resetSpeed() {
        this.speed = 0;
    }
}
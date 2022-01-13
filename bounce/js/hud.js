class Hud {    
    constructor(player) {
        this.player = player;
    }

    draw(canvasContext) {
        canvasContext.font = '12 serif';
        let relp_x = this.player.posX - 100;
        let relp_y = this.player.posY + 100;


        canvasContext.fillStyle = 'green';
        canvasContext.font = '16px sans';
        canvasContext.fillText('Lives: ', relp_x, relp_y );


        var  x = 60;
        for (var i = 0; i < this.player.lives; i++) {
            canvasContext.drawImage(this.player.livingImage, relp_x +  x, relp_y-12);
            //canvasContext.drawImage(this.player.livingImage, 900, 400);
            x += 24;

        }

    }
}

export { Hud }
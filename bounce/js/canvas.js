class canvas {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.container = document.getElementById("canvas-container");
    this.canvas.width = 500;
    this.canvas.height = 365;
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.view = {
      x: 0,
      y: 0,
      width: this.canvas.width,
      height: this.canvas.height,
    };

    this.sprite = {
        ball = new Sprite(0,10),
    }
  }
  drawTile(tile,i,j){
      const x = i*Tile.size
  }
}
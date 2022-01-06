export const bounce = document.getElementById("bounce");
var image_dir = "images/sprite.png";
var sheet_img = new Image();
sheet_img.src = image_dir;

const TILE_ROW_HEIGHT = 12;

let symbolToSpriteSheetCoords = {
  S: [0, 0, 12, 12], // format [pos_x, pos_y, width, height]
  B: [24, 0, 12, 12],
};

//same keys as symbolToSpriteSheetCoords. Will hold ImageData (change later to data URI?)
let loadedImages = {};

var level1Config = {
  playerCoords: [0, 0],

  tiles: [
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",  
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBSBB",
    "BBSSSSSSSSSSSSSSSSSSSSSSSSBBSSSSSSBBSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "BBSSSSSSSSSSSSSSSSSSSSSSSSBBSSSSSSBBSSSSSBBBBBSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "BBSSSSSSSSSSSSSBBBBBBBBBSSBBSSBBSSSSSSSSSBBBBBSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "BBSSSSSSSSSSSSSBBSSSSSBBSSBBSSBBSSSSSSSSSBBBBBSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "BBSSSSSSSSSSSSSBBSSSSSSSSSSSSSBBSSSSSSSSSBBBBBSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "BBSSSSSSSSSSSSSBBSSSSSSSSSSSSSBBSSSSSSSSSBBBBBSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
  ],
};

const context = bounce.getContext("2d");
export default function main(bounce) {
  const runLevel = () => {
    canvas;
  };

  window.addEventListener("keypress", (event) => {
    if (event.code == "Enter") {
      console.log("before this");
      document.querySelector(".canvas-cover").style.display = "none";
    }
  });
}
main(bounce);
//const [key, value] of Object.entries(object1)
function loadUsingSpriteSheet() {
  //temporary canvas to extract image data from sprite sheet
  //we do not show this in the dom
  let canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1000;
  let ctx = canvas.getContext("2d");
  ctx.drawImage(sheet_img, 0, 0);

  var temp_canvas = CanvasRenderingContext2D;
  let newCanvas = document.createElement("canvas");

  for (let [key, value] of Object.entries(symbolToSpriteSheetCoords)) {
    // get location and size info
    var infoArray = symbolToSpriteSheetCoords[key];

    let [pos_x, pos_y, width, height] = infoArray;
    // get the image data for this symbol
    var imageData = ctx.getImageData(...infoArray);

    //use another canvas (with the same dimensions as our about-to-be sprite)
    //newCanvas.width = width;
    //newCanvas.height = height
    //let newCtx = newCanvas.getContext('2d')
    //newCtx.putImageData(imageData, 0, 0)

    //loadedImages[key] = newCanvas.getI()

    loadedImages[key] = imageData;
  }
  //test:
  drawTileMap();
}

function drawTileMap() {
  var main_canvas = document.getElementById("bounce");
  var main_context = main_canvas.getContext("2d");

  var rows = level1Config.tiles;
  let my_y = 0;

  rows.forEach(function (row, index) {
    my_y = index * TILE_ROW_HEIGHT;

    for (let idx = 0; idx < row.length; idx++) {
      var symbol = row.charAt(idx);
      var imageData = loadedImages[symbol];
      var x = idx * 12;
      main_context.putImageData(imageData, x, my_y);
    }
  });
}

sheet_img.onload = () => {
  //console.log("callback");
  loadUsingSpriteSheet();
  //context.drawImage(sheet_img, 0, 0);
  //buildLevel();
  //runLevel();
};

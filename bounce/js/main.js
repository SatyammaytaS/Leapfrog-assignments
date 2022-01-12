export const bounce = document.getElementById("bounce");

import { Player } from "./player.js"
import { Block } from './block.js';
var image_dir = "images/sprite.png";
var sheet_img = new Image();
sheet_img.src = image_dir;

const TILE_ROW_HEIGHT = 12;

let symbolToSpriteSheetCoords = {
    // format [pos_x, pos_y, width, height]
  S: [0, 0, 12, 12], // SKY
  B: [24, 0, 12, 12], //BRICK
  D: [24, 72, 12, 12], //DIAMOND
  A: [48, 72, 12, 12], //ARROW
  U: [48, 0, 12, 12], //UP_BRICK
  L: [72, 0, 12, 12], //LOW_BRICK
  W: [0, 24, 12, 12], //WATER
  Z: [0, 48, 12, 12], //SIZE_CHANGE_FROM_SMALL_TO_BIG
  Y: [24, 48, 12, 12], // " BUT_UNDERWATER
  O: [48, 48, 12, 12], //SIZE_CHANGE_FROM_BIG_TO_SMALL
  P: [72, 48, 12, 12], // " BUT_UNDERWATER
  E: [0, 72, 12, 12], // EXTRA_HEALTH
  J: [24, 24, 12, 12], //JUMP_HIGH_BRICK
  I: [0, 96, 12, 12], //OBSTRACLE_1_METAL_THRONE
  G: [12, 132, 6, 22],


  PLAYER: [0, 120, 12, 12]



};


let actionState  = {
  'go_left': false,
  'go_right': false,
  'jump': false
}

//same keys as symbolToSpriteSheetCoords. Will hold ImageData (change later to data URI?)
let loadedImages = {};

var level1Config = {
  playerCoords: [0, 0],

  tiles: [
      // ......FOR LEVEL_2......
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSBBBBBBBBBBBBBBBBBBBBBBBBSSSS",  
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSBBSSSSSSSSSSSSSSSSSSSSBBSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSBBSSSSSSSSSSSSSSSSSSSSBBSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSBBSSSSSSSSSSSSSSSSSSSSBBSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSBBBBBBBBBBBBBBSSSSSSSSBBSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSBBSSSSSSSSSSSSSSSSSSSSBBSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSBBSSSSSSSSSSSSSSSSSSSSBBSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSBBSSSBBBBBBBBBBBBBBBBBBBSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSBBSSSSSSSSSSSSSSSSSSSSBBSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSBBSSSSSSSSSSSSSSSSSSSSBBSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSBBBBSSSSSSBBSSBBSSSSSSBBSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSBBSSSSSSSBBSSSSBBSSSSSBBSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSBBSSSSSSBBSSSSSSBBSSSSBBSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSBBSSSSSBBSSSISSSSBBSSSBBSSSS",
    "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBSSBBBBBB",
    "BBSSSSSSSSSSSSSSSSSSSSSSSSBBSSSSSSBBSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSBBSSSSSSSSSSSSSSSSSSSSBBSSSSSSSSSBBSSSSSSSSSSSSSBBSSSSSSSSSBBSSSSSBSSSSS",
    "BBSSSSSSSSSSSSSSSSSSSSSSSSBBSSSSSSBBSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSBBSSSSSSSSSSSSSSSSSSSSBBSSSSSSSSSBBSSSSSSSSSSSSSBBSSSSSSSSSBBSSSSSBSSSSS",
    "BBSSSSSSSSSSSSSBBBBBBBBBSSBBSSBBSSSSSSSSSBBBBBSSSSSSSSSSSSSSSSSSSSBBSSSSSSSSULSSSSSSSSSSBBSSSSSSSSSSSSSSSSSSSSBBSSBBSSSSBBSSSBBSSBBBBSSSSS",
    "BBSSSSSSSSSSSSSBBSESSSBBSSBBSSBBSSSSSSSSSBBBBBSSSSSSSSSSSSSSSSSSSSBBSSSSSSSUBBLSSSSSSSSSBBSSSSSSSSSSSSSSSSSSSSBBSSBBSSBBBBSSSSSSSSSSBSSSSS",
    "BBSSSSSSSSSSSSSBBSSSSSSSSSSSSSBBSSSSSSSSSBBBBBSSSSSSSSSSSSSSSSSSSSSSSSSSSSUBBBBLSSSSSSSSSSSSSSSSSSSBBSSSSSSSSSBBSSSSSSSSBBSSSSSSSSSSBBBBSS",
    "BBSSSSSSSSSSSISBBSSSSSSSDSSSSSBBZSSSSSSDSBBBBBSSSSSSSSSSSSSSSSSSSSSSSSSSSUBBBBBBLSSSSSSSSSSSSSSSSSSBBSSSSSSSSSBBSSSSSSSSBBSSSSSSSISSBBBBSS",
    "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
  ],
};
/*  .....FOR LEVEL_1......
    "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
    "BBSSSBBBBBBSSSSSSSSSSBBBSSSSSSSSSSSSSSSSSSSSBBBSSSSSSSSSSSSSSSSSSBBBSSSSSSBBSSSSSSBBSSSSSSSSSSSSSSSBBSSSSSSSSSBB",
    "BBSSSBBBBBBSSSSSSSSSSBBBSSSSSSSSSSSSSSSSSSSSBBSSSSSSSSSSSSSSSSSSSSBBSSSSSSBBSSSSSSBBSSSSSSSSSSSSSSSBBSSSSSSSSSBB",
    "BBSSSBBBBBBSSSBBSSSSSBBBSSSSSSSSSSSSSSSSSSSSBBSSSSSSSSSSSSSSSSSSSSBBSSBBSSBBSSBBSSBBSSBBSSSSSSSSSSSBBSSSSSSSSSBB",
    "BBSSSBBBBBBSSSBBSSSSSBBBSSBBBBSSBBBBSSBBBBSSBBSSSSSSSSSSSSSSSSSSSSBBSSBBSSBBSSBBSSBBSSBBSSSSSSSBBSSBBSSBBSSSSSBB",
    "BBSSSSSSSSSSSSBBSSSSSSSSSSBBSSSSSBBSSSSSBBSSSSSSSSSSSSSSSSSSSSSSSSSSSSBBSSSSSSBBSSSSSSBBSSSSBBSBBSSSSSSBBSBBSSBB",
    "BBSSSSSSSSSSSSBBSSSSSSSSSSBBSSSSSSSSSSSSBBSSSSSSSSSSSSSSSSSSSSSSSSSSSSBBSSSSSSBBSSSSSSBBSSSSBBBBBSSSSSSBBBBBSSBB",
    "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",

*/

const context = bounce.getContext("2d");

// export default function main(bounce) {
//   const runLevel = () => {
//     canvas;
//   };

//   window.addEventListener("keypress", (event) => {
//     if (event.code == "Enter") {

//       document.querySelector(".canvas-cover").style.display = "none";
//     }
//   });
// }



//const [key, value] of Object.entries(object1)
function loadUsingSpriteSheet() {
  //temporary canvas to extract image data from sprite sheet
  //we do not show this in the dom
  let canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1000;
  let ctx = canvas.getContext("2d");
  ctx.drawImage(sheet_img, 0, 0);


  for (let [key, value] of Object.entries(symbolToSpriteSheetCoords)) {
    // get location and size info
    var infoArray = symbolToSpriteSheetCoords[key];

    let [pos_x, pos_y, width, height] = infoArray;
    
    var imageData = ctx.getImageData(...infoArray);

    //per-sprite canvas
    let temp_canvas = document.createElement("canvas");
    let temp_ctx = temp_canvas.getContext("2d");  
    temp_canvas.width = width;
    temp_canvas.height = height;
  
    temp_ctx.putImageData(imageData, 0, 0);

    var data_url = temp_canvas.toDataURL("image/png");
    var my_new_img = new Image();
    my_new_img.src = data_url;




    loadedImages[key] = my_new_img;
    temp_canvas.remove();
    
    // loadedImages[key] = imageData;
  }
  //test:
  drawTileMapBG();
}

function drawTileMapBG() {
  var main_canvas = document.getElementById("bounce");
  var main_context = main_canvas.getContext("2d");

  var rows = level1Config.tiles;
  let my_y = 0;

  rows.forEach(function (row, index) {
    my_y = index * TILE_ROW_HEIGHT;

    for (let idx = 0; idx < row.length; idx++) {
      var symbol = row.charAt(idx);

    
      //var imageData = loadedImages[symbol];
      var x = idx * 12;
      //main_context.putImageData(imageData, x, my_y);
      var img = loadedImages[symbol];
      main_context.drawImage(img, x, my_y);
    }
  });

}


function generateObjects() {
  var ret = {
    'bricks': []
  };
  var main_canvas = document.getElementById("bounce");
  var main_context = main_canvas.getContext("2d");

  var rows = level1Config.tiles;
  let my_y = 0;

  rows.forEach(function (row, index) {
    my_y = index * TILE_ROW_HEIGHT;

    for (let idx = 0; idx < row.length; idx++) {
      var symbol = row.charAt(idx);

      if (['B', 'U', 'L'].includes(symbol)) {
          var x = idx * 12;
          var block = new Block(x, my_y, loadedImages[symbol], symbol);
          ret['bricks'].push(block);
       
      } else {
        continue;
      }
    }
  });

  return ret;

}

sheet_img.onload = () => {
  console.log("Spritesheet loaded")
  loadUsingSpriteSheet();

  mainLoopSetup();
};


function mainLoopSetup() {
  var canvas = document.getElementById("bounce");
  var context = canvas.getContext('2d')

  let player = new Player(120, 180, loadedImages['PLAYER']);
  let objects = generateObjects();
  let allBricks = objects['bricks'];
  let collisionObjects = allBricks;

  context.translate(0, -200)
  context.scale(1.75, 1.75)

  function mainLoop() {
    context.translate(-player.velX, -player.velY);
    //context.clearRect(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, player.posX + canvas.width, player.posY + canvas.height);

    drawTileMapBG();
    player.update(actionState, collisionObjects, context);
    player.draw(context);

    requestAnimationFrame(mainLoop);
  }

  mainLoop();
  
}



window.addEventListener('keydown', logKeyDown);
window.addEventListener('keyup', logKeyUp);

function logKeyDown(e) {
  if (e.code == "ArrowRight" || e.code == "KeyD") {
    actionState['go_right'] = true
  } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
    actionState['go_left'] = true
  } else if (e.code == "ArrowUp" || e.code == "KeyW") {
    actionState['jump'] = true;       //falsified by the player logic itself; single jump only
  }
}

function logKeyUp(e) {
  if (e.code == "ArrowRight" || e.code == "KeyD") {
    actionState['go_right'] = false
  } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
    actionState['go_left'] = false
  }
}
export const bounce = document.getElementById("bounce");

import { Player } from "./player.js"
import { Block } from './block.js';
import { Enemy } from './enemy.js';
import { Hud } from './hud.js';
import { SYMBOL_TO_SPRITESHEET_COORDS } from './const.js'
import { LevelMaker } from './levelmaker.js';

var image_dir = "images/sprite.png";
var sheet_img = new Image();
sheet_img.src = image_dir;

const TILE_ROW_HEIGHT = 12;

var levelMaker = null; //loaded later
var mode = null;  //values are : null, 'PLAYING', 'LEVELMAKER'

let actionState  = {
  'go_left': false,
  'go_right': false,
  'jump': false
}

//same keys as SYMBOL_TO_SPRITESHEET_COORDS. Will hold ImageData (change later to data URI?)
let loadedImages = {};

var level1Config = {
  playerCoords: [1000, 180],

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
    "BBSSSSSSSSSSSSSBBBBBBBBBSSBBSSBBSSSSSSSSSBBBBBSSSSSSSSSSSSSSSSSSSSBBSSSSSSSSSSSSSSSSSSSSBBSSSSSSSSSSSSSSSSSSSSBBSSBBSSSSBBSSSBBSSBBBBSSSSS",
    "BBSSSSSSSSSSSSSBBSSSSSBBSSBBSSBBSSSSSSSSSBBBBBSSSSSSSSSSSSSSSSSSSSBBSESSSSSUBBLSSSSSSSSSBBSSSSSSSSSSSSSSSSSSSSBBSSBBSSBBBBSSSSSSSSSSBSSSSS",
    "BBSSSSSSSSSSSSSBBSSSSSSSSSSSSSBBSSSSSSSSSBBBBBSSSSSSSSSSSSSSSSSPSSSSSSSSSSUBBBBLSSSSSSSSSSSSSSSSSSSBBSSSSSSSSSBBSSSSSSSSBBSSSSSSSSSSBBBBSS",
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


  for (let [key, value] of Object.entries(SYMBOL_TO_SPRITESHEET_COORDS)) {
    // get location and size info
    var infoArray = SYMBOL_TO_SPRITESHEET_COORDS[key];

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
  //drawTileMapBG();
}

function drawTileMapBG(tiles) {
  var main_canvas = document.getElementById("bounce");
  var main_context = main_canvas.getContext("2d");

  var rows = tiles;
  let my_y = 0;

  rows.forEach(function (row, index) {
    my_y = index * TILE_ROW_HEIGHT;

    for (let idx = 0; idx < row.length; idx++) {
      var symbol = row.charAt(idx);

      //don't draw dynamic objects (enemies, the player, etc.) ; they have their
      //own draw() functions. Replace such tiles with sky.
      if (symbol == 'E' || symbol == 'P') {
        symbol = 'S';   
      }

    
      //var imageData = loadedImages[symbol];
      var x = idx * 12;
      //main_context.putImageData(imageData, x, my_y);
      var img = loadedImages[symbol];
      main_context.drawImage(img, x, my_y);
    }
  });

}


function generateObjects(tileset) {
  var ret = {
    'bricks': [],
    'enemies': [],
    'player': null,
  };

  var main_canvas = document.getElementById("bounce");
  var main_context = main_canvas.getContext("2d");

  var rows = tileset;
  let my_y = 0;

  rows.forEach(function (row, index) {
    my_y = index * TILE_ROW_HEIGHT;

    for (let idx = 0; idx < row.length; idx++) {
      var symbol = row.charAt(idx);
      var x = idx * 12;

      if (['B', 'U', 'L'].includes(symbol)) {
          var block = new Block(x, my_y, loadedImages[symbol], symbol);
          ret['bricks'].push(block);
       
      } else if (symbol == 'E') {
          var enem = new Enemy(x, my_y, loadedImages[symbol], 'E');
          ret['enemies'].push(enem);
       } else  if (symbol == 'P') {
          ret['player'] = new Player(x, my_y, loadedImages['P'], loadedImages['Q']);
        
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

  levelMaker = new LevelMaker(loadedImages, document.getElementById('bounce'));

  var canvas = document.getElementById("bounce");
  var context = canvas.getContext('2d');
  context.font = '32px serif';
  context.fillText("Z -> standard level", 20, 50)
  context.fillText("X -> level maker", 20, 100)
  context.fillText("C -> play custom-made level", 20, 150)




};


function play(tileset) {

  var canvas = document.getElementById("bounce");
  var context = canvas.getContext('2d');

  let objects = generateObjects(tileset);
  let allBricks = objects['bricks'];
  let allEnemies = objects['enemies'];
  let collisionObjects = allBricks;
  
  let player = objects['player'];
  player.ctx = context;
  player.canvas = canvas;


  let hud = new Hud(player);

  


  function resetGame() {
  
    player.reset();

    context.setTransform();   //reset   (does not account for scale)
    //context.translate(0, -200)
    context.scale(1.75, 1.75)
    context.translate(-player.origPos[0] + 100 , -player.origPos[1] + 50);
    //context.translate(-origX + 150, 0)

  }

  resetGame();
  context.clearRect(0, 0, 138 * 12, 22 * 12);

  async function mainLoop() {
    context.translate(-player.totVelX, -player.totVelY);
    //context.clearRect(0, 0, canvas.width, canvas.height);
    //context.clearRect(0, 0, player.posX + canvas.width, player.posY + canvas.height);
    context.clearRect(0, 0, 5000, 5000)     //temp; not limiting wipe to within viewport
    drawTileMapBG(tileset);

    for (let enemy of allEnemies) {
      enemy.update(collisionObjects);
      enemy.draw(context);
    }
    player.update(actionState, collisionObjects, allEnemies, context);
    player.draw(context);
    hud.draw(context); 

    if (player.alive == false) {
      //sleep for 2 secs, and reload
      await new Promise(r => setTimeout(r, 3000));
      resetGame();
      player.alive = true;

    }

    //don't interfere with levelmaker
    if (mode == 'PLAYING') {
      requestAnimationFrame(mainLoop);
 
    } 
  }

  mainLoop();
  
}



window.addEventListener('keydown', logKeyDown);
window.addEventListener('keyup', logKeyUp);

function logKeyDown(e) {

  if (e.code == 'KeyZ') {
    //playGame
    mode = 'PLAYING';
    document.getElementById('levelmaker-ui').hidden = true;
    levelMaker.running = false;

    context.setTransform();     //reset transforms

    //check for created level
    play(level1Config.tiles);
  }
  if (e.code == 'KeyX') {
    //level maker
    mode = 'LEVELMAKER';
    document.getElementById('levelmaker-ui').hidden = false;

    context.setTransform();
    levelMaker.run();
  }
  if (e.code == "KeyC") {
    //play (possibly non-existent) custom level
    mode = 'PLAYING';
    document.getElementById('levelmaker-ui').hidden = true;
    levelMaker.running = false;

    var tileset = null;

    //option 1: explicit save (by clicking 'save' in levelMaker)
    if (localStorage.getItem("tileset")) {
      tileset = JSON.parse(localStorage.getItem("tileset"));
      
    } 
    //option 2 : just use whatever data is in the level maker;
    //this allows us to design, play, and redesign levels
    else if (levelMaker.tileset) {
      tileset = levelMaker.tileset;
    }


    if (tileset) {
      context.setTransform();
      play(tileset);


    }
  }

  if (mode == 'LEVELMAKER') {
    return;         // disable movement key effects during level creation
  }


  if (e.code == "ArrowRight" || e.code == "KeyD") {
    actionState['go_right'] = true
  } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
    actionState['go_left'] = true
  } else if (e.code == "ArrowUp" || e.code == "KeyW") {
    actionState['jump'] = true;       //falsified by the player logic itself; single jump only
  }

}

function logKeyUp(e) {
   if (mode == 'LEVELMAKER') {
    return;         // disable movement key effects during level creation
  }

  if (e.code == "ArrowRight" || e.code == "KeyD") {
    actionState['go_right'] = false
  } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
    actionState['go_left'] = false
  }
}

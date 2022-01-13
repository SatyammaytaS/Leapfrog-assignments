const SCALE = 1.75
const ALLOWED_TILESET = "PBEULS"
class LevelMaker {
    constructor(loadedImages, canvas) {
        this.tileset = []; //array of strings; each string represents one row with unit size=12 px
        this.camOffset = [0, 0]; //'camera'
        this.numColumns = 138;
        this.numRows = 22;
        this.width = this.numColumns * 12;
        this.height = this.numRows * 12;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.loadedImages = loadedImages;
        this.running = false;

        this.x = 0;      //reference position
        this.y = 100; 
        this.curSymbol = 'B';
        document.getElementById('cursym').src = this.loadedImages['B'].src;


        var canvasRect = this.canvas.getBoundingClientRect();
        this.initialOffset = [canvasRect.left, canvasRect.top + 90];
        console.log(this.initialOffset);
        //this.initialOffset = [185, 270];        //hardcoded vals for now; clientX and clientY are null


    
        

        //empty level data
        for (var i = 0; i < this.numRows; i++) {
            var str = '';
            for (var j = 0; j < this.numColumns; j++) {
                str += 'S';
            }

            this.tileset.push(str);
        }

        var self = this;

        
        var div = document.getElementById('levelmaker-imgbuttons');
        for (let [key, value] of Object.entries(this.loadedImages)) {

            //only show certain tiles
            if (!ALLOWED_TILESET.includes(key)) {
                continue;
            }

            var but = document.createElement("button");
            but.dataset.symbol = key;
            but.appendChild(value);
            but.onclick = () => {
                self.curSymbol = key;
                document.getElementById('cursym').src = value.src;
            }
            div.appendChild(but);

        }

        document.getElementById('b-scrollright').onclick = () => { this.x += 12 ; }
        document.getElementById('b-scrollleft').onclick = () => { this.x -= 12 ; }
        document.getElementById('b-scrollup').onclick = () => { this.y -= 12 ; }
        document.getElementById('b-scrolldown').onclick = () => { this.y += 12 ; }


        //save the map
        document.getElementById('savebut').onclick = () => {
            localStorage.setItem("tileset", JSON.stringify(self.tileset));
        };


        document.addEventListener("click", (evt) => {

            //don't do anything while a game is running
            //if a game is running, LevelMaker's runnign attribtue will be false
            if (!self.running) {
                return;
            }
            let mousePos = [evt.clientX, evt.clientY];
            console.log(mousePos);

            //get tile position
            var colIdx = Math.floor((mousePos[0] - this.initialOffset[0] + this.x * SCALE) / (12 * SCALE) );
            var rowIdx = Math.floor((mousePos[1] - this.initialOffset[1] + this.y * SCALE) / (12  * SCALE) );

            //out of bounds, not inside canvas
            if (colIdx < 0 || colIdx > this.width-1 || rowIdx < 0 || rowIdx > this.height-1) {
                return; 
            }

            //console.log(mousePos, rowIdx, colIdx);
            //replace a character in the string to encode a new tile
            var oldString = self.tileset[rowIdx];
            var newString = oldString.substring(0, colIdx) + self.curSymbol + oldString.substring(colIdx + 1)
            self.tileset[rowIdx] = newString;   
        });


    }

    drawGrid() {
        this.ctx.strokeStyle = 'green';
        //draw vertical lines
        for (var i = 0; i < this.width; i += 12) {
            
            this.ctx.beginPath();
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, this.height);
            this.ctx.stroke();
        }

        //draw horizontal lines
        for (var j = 0; j < this.height; j += 12) {
            
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, j);
            this.ctx.lineTo(this.width, j);
            this.ctx.stroke();
        }

    }
    reset() {

        this.ctx.setTransform();   //reset
        this.ctx.scale(SCALE, SCALE) 

    }

    cameraStuff() {
        this.ctx.translate(-this.x, -this.y);
    }

    run() {

        this.running = true;
        var self = this;

        function mainLoop(parent) {

            
            
            self.reset();
            self.ctx.clearRect(0, 0, self.width, self.height);
            self.cameraStuff();

            var rows = self.tileset;
            let my_y = 0;

            rows.forEach(function (row, index) {
                my_y = index * 12;

                for (let idx = 0; idx < row.length; idx++) {
                    var symbol = row.charAt(idx);


                    //var imageData = loadedImages[symbol];
                    var x = idx * 12;
                    //main_context.putImageData(imageData, x, my_y);
                    var img = self.loadedImages[symbol];
                    self.ctx.drawImage(img, x, my_y);
                }
            });
            
            self.drawGrid();
            

            //don't interfere with game's render
            if (self.running) {
                requestAnimationFrame(mainLoop);            
            }
        }

        mainLoop();

    }


}


export {LevelMaker}
class imageCarousal {
   /**
    * 
    * @param {String} containerId 
    * @param {Number} delayTime in ms 1000ms, 3000ms
    * @param {Number} transitionTime in FPS eg: 60fps, 30 fps
    */
    
    constructor(containerId, delayTime, transitionTime){

        this.container = document.getElementById(containerId);
        this.wrapper = this.container.querySelector('.carousel-wrapper');
        this.image_list = this.wrapper.querySelectorAll(".carousel-wrapper img");
        this.nextButton = document.createElement('div');
        this.previousButton = document.createElement('div');
        this.indicator_wrapper = document.createElement('div');
        
        this.imageLength = this.image_list.length;
        this.currentIndex = 0;
        this.width = 600
        this.height = 300
        this.isTransiting= false;

        this.delayTime = delayTime
        this.transitionTime = transitionTime

        

        this.wrapperLeft = 0;
        this.indicator_list = []

        console.log(this.wrapper)

    }  

    //container design
    createContainer() {
        this.container.style.width = this.width + 'px';
        this.container.style.height = this.height + 'px';
        this.container.style.overflow = 'hidden';
        this.container.style.margin = '0 auto';
        this.container.style.position = 'relative';
    }

    //wrapper
    createWrapper(){
        this.wrapper.style.width = this.width * this.imageLength + 'px'
        this.wrapper.style.height = this.height + 'px'
        this.wrapper.style.marginLeft = '0px';
        this.wrapper.style.position = 'absolute';
        this.wrapper.style.left = '0px'
    }

    //button
    previousBtn() {
        this.previousButton.setAttribute('id', '#previousButton');
        this.previousButton.setAttribute('class', 'left');
        this.previousButton.style.position = 'absolute'; 
        this.previousButton.style.top = '50%';
        this.previousButton.style.left = '0';
        this.previousButton.style.padding = '100% 2%'
        this.previousButton.style.transform = 'translate(0, -50%)';
        this.previousButton.style.color = '#ffffff';
        this.previousButton.style.fontSize = '30px';
        this.previousButton.innerHTML = '<'
        this.previousButton.style.background = '#000000';
        this.previousButton.style.border = 'none';
        this.previousButton.style.opacity= '0.25'
        this.previousButton.style.cursor = 'pointer'
        this.container.appendChild(this.previousButton);
    }

    nextBtn(){
        this.nextButton.setAttribute('id', '#nextButton');
        this.nextButton.setAttribute('class', 'right');
        this.nextButton.style.position = 'absolute';
        this.nextButton.style.top = '50%';
        this.nextButton.style.right = '0';
        this.nextButton.style.padding = '100% 2%';
        this.nextButton.style.transform = 'translate(0,-50%)';
        this.nextButton.style.color = '#ffffff';
        this.nextButton.style.fontSize = '30px';
        this.nextButton.style.background = '#5D5B5B';
        this.nextButton.style.border = 'none';
        this.nextButton.style.opacity= '0.25'
        this.nextButton.style.cursor = 'pointer'
        this.nextButton.innerHTML = '>'
        this.container.appendChild(this.nextButton);
    }

    //indicator
    createIndicatorWrapper(){
        this.indicator_wrapper.className = "indicator_wrapper";
        this.indicator_wrapper.style.display = "inline-block";
        this.indicator_wrapper.style.position = "absolute";
        this.indicator_wrapper.style.left = '50%';
        this.indicator_wrapper.style.transform = 'translate(-50%, 0%)';
        this.indicator_wrapper.style.bottom = '5px';
        this.indicator_wrapper.margin = '0, auto';
        this.container.appendChild(this.indicator_wrapper);
        this.createIndicator();
    }

    createIndicator(){
        for ( var i = 0; i < this.imageLength; i++) {

            this.image_list[i].style.float = "left"
            this.indicator = document.createElement('div');
            this.indicator.className = "indicator";
            this.indicator.style.display = 'inline-block';
            this.indicator.style.height = '10px';
            this.indicator.style.width = '10px';
            this.indicator.style.background = '#AFACAB';
            this.indicator.style.borderRadius = '50%';
            this.indicator.style.marginRight = '15px';
            this.indicator.style.cursor = 'pointer';
            this.indicator_wrapper.appendChild(this.indicator);

            let x = i
            this.indicator.addEventListener('click', () =>{
        
            this.imageTrasnsition(this.currentIndex, x);
            return this.currentIndex = x;
        
            });
    
            this.indicator_list.push(this.indicator)
        }    
    }
            /**
             * 
             * @param {Number} index 
             */
        setActiveDot(index){
            for(var i=0; i<this.indicator_list.length; i++){
                if (index === i){
                    this.indicator_list[i].style.backgroundColor = '#ffffff'
                } else this.indicator_list[i].style.backgroundColor = '#B6B6B6'
            }
        }

        /**
         * 
         * @param {Number} currentIndex 
         * @param {Number} nextIndex 
         */
    imageTrasnsition(currentIndex, nextIndex){


        var interval = setInterval(()=>{ 

            var dir =  nextIndex > currentIndex ? 1 : -1; 

            //special cases
            if (currentIndex ==  0 && nextIndex == this.imageLength-1) {
                this.wrapperLeft += (-dir) * (this.width/20)

            } else  if (currentIndex == this.imageLength-1 && nextIndex == 0 ) {

                this.wrapperLeft += (-dir) * (this.width/20)
            }
            //animation case
            this.wrapperLeft += (-dir) * (this.width/this.transitionTime);   //move left/right by 1/60th of image width
            this.wrapper.style.left = this.wrapperLeft + 'px';

            if (dir == 1 && this.wrapperLeft <= -(nextIndex) * this.width) { //reached right image
                this.wrapper.style.left = -nextIndex * this.width + 'px';
                this.setActiveDot(nextIndex);
                clearInterval(interval);
                this.isTransiting = false;
            } else if ( dir == -1 && this.wrapperLeft >= -(nextIndex) * this.width) { //reached left image
                this.wrapper.style.left = -nextIndex * this.width + 'px';
                clearInterval(interval);
                this.setActiveDot(nextIndex);
                this.isTransiting = false;
            }   

            
        },16.67);

        return nextIndex;

     
    }

       //listeners

    addListeners(){
        this.previousButton.addEventListener('click',  () =>  {
            if(!this.isTransiting){
        let  pastIndex = (this.currentIndex-1 + this.imageLength) % this.imageLength;
            this.currentIndex = this.imageTrasnsition(this.currentIndex, pastIndex)
        }
        });

        this.nextButton.addEventListener('click',()=> {
             if (!this.isTransiting){
                if (this.currentIndex == this.imageLength-1){
                    this.currentIndex = 0;
                    this.currentIndex = this.imageTrasnsition(this.imageLength-1, this.currentIndex);
                } else {
                    this.currentIndex = this.imageTrasnsition(this.currentIndex, this.currentIndex+1);
                }
            }
        });

    }
    
    //autoplay
    autoPlay(){
        setInterval(()=>{
            this.currentIndex = this.imageTrasnsition(this.currentIndex, (this.currentIndex +1) % this.imageLength)
        }, this.delayTime)
    }

    // calls all
    carousal(){
        this.nextBtn();
        this.previousBtn();
        this.createContainer();
        this.createWrapper();
        this.createIndicatorWrapper();
        this.addListeners();
        this.autoPlay();
    }

}

const imageCarousal1 = new imageCarousal('container1', 5000, 60);
imageCarousal1.carousal();

const imageCarousal2 = new imageCarousal('container2', 3000, 30);
imageCarousal2.carousal();
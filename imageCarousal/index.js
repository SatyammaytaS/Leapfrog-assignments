const IMAGE_WIDTH = 940
IMAGE_HEIGHT = 600

//reset.css
document.body.style.margin = `0px`;
document.body.style.padding = `0px`;
document.body.style.boxSizing = 'border-box';

//create and get elements
this.container = document.querySelector(".carousel-container")
this.wrapper = document.querySelector(".carousel-image-wrapper")
this.image_list = document.querySelectorAll(".carousel-image-wrapper img")
previousButton = document.createElement('div')
nextButton = document.createElement('div')

let imageLength = this.image_list.length

//wrapper style
wrapper.style.width = IMAGE_WIDTH * imageLength + 'px'
wrapper.style.height = IMAGE_HEIGHT + 'px'
wrapper.style.marginLeft = '0px';
wrapper.style.position = 'absolute';
wrapper.style.left = '0px'
var wrapperLeft = 0;

container.style.width = IMAGE_WIDTH + 'px';
container.style.height = IMAGE_HEIGHT + 'px';
container.style.overflow = 'hidden';
container.style.margin = '0 auto';
container.style.position = 'relative';


//indicator wrapper
this.indicator_wrapper = document.createElement('div')
indicator_wrapper.className = "indicator_wrapper";
indicator_wrapper.style.display = "inline-block";
indicator_wrapper.style.position = "absolute";
indicator_wrapper.style.left = '50%';
indicator_wrapper.style.transform = 'translate(-50%, 0%)';
indicator_wrapper.style.bottom = '5px';
indicator_wrapper.margin = '0, auto';
container.appendChild(indicator_wrapper);

let indicator_list = []

//image and indicator size and position
for ( var i = 0; i < imageLength; i++) {

    this.image_list[i].style.float = "left"
    

    this.indicator = document.createElement('div')
    indicator.className = "indicator";
    indicator.style.display = 'inline-block';
    indicator.style.height = '15px';
    indicator.style.width = '15px';
    indicator.style.background = '#AFACAB';
    indicator.style.borderRadius = '50%';
    indicator.style.marginRight = '15px';
    indicator.style.cursor = 'pointer';

    indicator_wrapper.appendChild(indicator);

    let x = i
    indicator.addEventListener('click', function(){
        
        imageTrasnsition(currentIndex, x);

        console.log(currentIndex, x)
        return currentIndex = x;
        
    });
    
    indicator_list.push(indicator)
    
    
    
}
console.log(indicator_list)

 

function setActiveDot(index){
    for(var i=0; i<indicator_list.length; i++){
        if (index === i){
            indicator_list[i].style.backgroundColor = '#3694EE'
        } else indicator_list[i].style.backgroundColor = '#AFACAB'
    }
}

//buttons
previousButton.setAttribute('id', '#previousButton');
previousButton.setAttribute('class', 'left');
previousButton.style.position = 'absolute';
previousButton.style.top = '50%';
previousButton.style.left = '0';
previousButton.style.padding = '100% 50px'
previousButton.style.transform = 'translate(0, -50%)';
previousButton.style.color = '#ffffff';
previousButton.style.fontSize = '30px';
previousButton.innerHTML = '<'
previousButton.style.background = '#000000';
previousButton.style.border = 'none';
previousButton.style.opacity= '0.25'
previousButton.style.cursor = 'pointer'
container.appendChild(previousButton);

nextButton.setAttribute('id', '#nextButton');
nextButton.setAttribute('class', 'right');
nextButton.style.position = 'absolute';
nextButton.style.top = '50%';
nextButton.style.right = '0';
nextButton.style.padding = '100% 50px';
nextButton.style.transform = 'translate(0,-50%)';
nextButton.style.color = '#ffffff';
nextButton.style.fontSize = '30px';
nextButton.style.background = '#5D5B5B';
nextButton.style.border = 'none';
nextButton.style.opacity= '0.25'
nextButton.style.cursor = 'pointer'
nextButton.innerHTML = '>'
container.appendChild(nextButton);

isTransiting = false;
let currentIndex = 0;

//btn click
nextButton.addEventListener('click', function(e){
    if (!isTransiting){
        if (currentIndex == imageLength-1){
            currentIndex = 0;
            currentIndex = imageTrasnsition(imageLength-1, currentIndex);
        } else {
            currentIndex = imageTrasnsition(currentIndex, currentIndex+1);
        }
    }
});

previousButton.addEventListener('click', function(e){
    if(!isTransiting){
       let  pastIndex = (currentIndex-1 + imageLength) % imageLength;
        currentIndex = imageTrasnsition(currentIndex, pastIndex)
    }
});


// main function
let imageTrasnsition = function(currentIndex, nextIndex){


    var interval = setInterval(function(){ 

        var dir =  nextIndex > currentIndex ? 1 : -1; 

        //special cases
        if (currentIndex ==  0 && nextIndex == imageLength-1) {
            wrapperLeft += (-dir) * (IMAGE_WIDTH/20)

        } else  if (currentIndex == imageLength-1 && nextIndex == 0 ) {

            wrapperLeft += (-dir) * (IMAGE_WIDTH/20)
        }
        //animation case
        wrapperLeft += (-dir) * (IMAGE_WIDTH/60);   //move left/right by 1/60th of image width
        wrapper.style.left = wrapperLeft + 'px';

        if (dir == 1 && wrapperLeft <= -(nextIndex) * IMAGE_WIDTH) { //reached right image
            wrapper.style.left = -nextIndex * IMAGE_WIDTH + 'px';
            setActiveDot(nextIndex);
            clearInterval(interval);
            isTransiting = false;
        } else if ( dir == -1 && wrapperLeft >= -(nextIndex) * IMAGE_WIDTH) { //reached left image
            wrapper.style.left = -nextIndex * IMAGE_WIDTH + 'px';
            clearInterval(interval);
            setActiveDot(nextIndex);
            isTransiting = false;
        }   

        
    },16.67);

    return nextIndex;

    //console.log(currentIndex, nextIndex)
}
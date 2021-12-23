const box= document.getElementById('boxid')
box.style.width= "400px"
box.style.height= "378px"
box.style.position= "relative"
box.style.border= "1px solid black"
box.style.margin="auto"

const bigPoint = document.createElement('div')
bigPoint.style.backgroundColor= "skyblue"
bigPoint.style.width="50px"
bigPoint.style.height="50px"
bigPoint.style.borderRadius="50%"
bigPoint.style.position="relative"
bigPoint.style.left="40%"
bigPoint.style.top="86.5%"



box.appendChild(bigPoint)
let bounceDirection = 0 // 0 == up 1 == down

const animation= () => {
    if(bounceDirection === 0){
        bigPoint.style.top = parseInt(bigPoint.style.top) - 1 + "%" 
        if (parseInt(bigPoint.style.top) <= 0){
            bounceDirection = 1

        }

    }else{
        bigPoint.style.top = parseInt(bigPoint.style.top) + 1 + "%" 
        if (parseInt(bigPoint.style.top) >= 86.5)
            bounceDirection = 0
        
    }
    
    const clickToChange= (e) =>{
        if (e.target.style.backgroundColor == 'skyblue'){
            e.target.style.backgroundColor = 'red';
            
        }
        else {
            e.target.style.backgroundColor = 'skyblue';
        }
    }
    bigPoint.addEventListener('click', clickToChange)   
}

setInterval(animation, 7)
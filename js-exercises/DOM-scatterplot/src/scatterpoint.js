// Render a scatter plot based on an array of coordinates.
// Create the container for the plot and create each point
// using javascript.
// var points = [
//     {x: 10, y: 20},
//     {x: 40, y, 40},
//     {x: 60, y, 20},
//     ...
// ];

var points = [
  { x: 10, y: 20 },
  { x: 40, y: 40 },
  { x: 60, y: 20 },
  { x: 90, y: 10 },
  { x: 110, y: 30 },
  { x: 130, y: 100 },
  { x: 160, y: 40 },
  { x: 180, y: 70 },
  { x: 200, y: 75 },
  { x: 230, y: 55 },
  { x: 250, y: 130 },
  { x: 270, y: 111 },
  { x: 300, y: 115 },
  { x: 330, y: 90 }
];

const creation = (x, y) => {
  const point = document.createElement("div");
  point.style.width = "10px";
  point.style.height = "10px";
  point.style.borderRadius = "50%";
  point.style.backgroundColor = "orange";
  point.style.position = "absolute";
  point.style.left = x + "px";
  point.style.bottom = y + "px";

  
  
  const clickToChange = (e) => {
    if (e.target.style.backgroundColor == 'orange')
        e.target.style.backgroundColor = 'red';
    else 
        e.target.style.backgroundColor = 'orange';
  }
  
  const dblClickToRemove = (e) => {
    box.removeChild(e.target);
  }

  
  point.addEventListener('click', clickToChange)
  point.addEventListener('dblclick', dblClickToRemove)
  
  return point;


};

const box = document.getElementById("boxid");
box.style.width = "373px";
box.style.height = "373px";
box.style.border = "1px solid black";
box.style.position = "relative";
box.style.margin= "auto auto";

for (let i = 0; i < points.length; i++) {
  const newPoint = creation(points[i].x, points[i].y);
  box.appendChild(newPoint);
}
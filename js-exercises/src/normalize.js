var input = {
  '1': {
    id: 1,
    name: 'John',
    children: [
      { id: 2, name: 'Sally' },
      { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
    ]
  },
  '5': {
    id: 5,
    name: 'Mike',
    children: [{ id: 6, name: 'Peter' }]
  }
};

/*var output = {
  '1': { id: 1, name: 'John', children: [2, 3] },
  '2': { id: 2, name: 'Sally' },
  '3': { id: 3, name: 'Mark', children: [4] },
  '4': { id: 4, name: 'Harry' },
  '5': { id: 5, name: 'Mike', children: [6] },
  '6': { id: 6, name: 'Peter' }
};*/

var output= {};



function normalise(miniObj){
  //miniObj here is our value from forEach loop order
  //Assign the first key to the output array
  output[miniObj["id"]]= miniObj;
  //search for the children
  if (miniObj["children"]){
    let childArr = []
    miniObj["children"].forEach((value) => {
      childArr.push(value.id);
      //apend to the childArr
      miniObj["children"] = childArr;
      //Recursive function
      normalise(value)

    });
  }


}

Object.values(input).forEach(miniObj => normalise(miniObj) )
console.log(output)
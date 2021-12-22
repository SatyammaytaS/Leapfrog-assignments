/*Write a program to sort an array of object by a target key. 
The original array should remain unchanged.
*/ 

/*Write a program to sort an array of object by 
a target key. The original array should remain unchanged. */


var arr = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Mary",
  },
  {
    id: 3,
    name: "Andrew",
  },
];

function sortBy(array, key) {
  let tempArr=array.slice();
  tempArr.sort(function(i,j){
    if(array.key=== isNaN){
      if(i[key].toLowerCase()<j[key].toLowerCase())return -1;
      else if(i[key].toLowerCase()>j[key].toLowerCase())return 1;
      return 0;
    }
    else{
      if(i[key]<j[key])return -1;
      else if(i[key]>j[key])return 1;
      return 0;
    }
  })
  return tempArr;
}

let sorted= sortBy(arr, 'name')
console.log(sorted)
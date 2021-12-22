/*Write a function that transforms an array of inputs into a new 
array based on a provided transformation function.*/

var numbers = [1, 2, 3, 4];

function transform(collection, tranFunc) {
  let tempArr=[];
  for(let i = 0; i< collection.length;i++){
      tempArr.push(tranFunc(collection[i]))
  }
  return tempArr;
}
var output = transform(numbers, function(num) {
  return num * 2;
});
console.log(output);
/*Write a function that searches for an object by a specific
 key value in an array of objects:
var fruits = [
    {id: 1, name: 'Banana', color: 'Yellow'},
    {id: 2, name: 'Apple', color: 'Red'}
]
searchByName(fruits, 'apple');
Should return: {id: 2, name: 'Apple', color: 'Red'}
Also try searchByKey(fruits, 'name', 'apple');*/

var fruits = [
  { id: 1, name: "Banana", color: "Yellow" },
  { id: 2, name: "Apple", color: "Red" }
];

/*function searchByName(arrName, frname) {
  let obj = arrName.find(ni => ni.name.toLowerCase() === frname.toLowerCase());
  console.log(obj);
}
searchByName(fruits, 'apple');*/

function searchByName(array, valname) {
  let obj = {};
  for (let i = 0; i < array.length; i++) {
    if (valname.toLowerCase() === array[i].name.toLowerCase()) {
      obj = array[i];
      console.log(obj);
      break;
  }
  }
}

searchByName(fruits, "apple");

function searchByKey(arr, key, valuename) {
  let obj = {};
  let value = valuename;
  let valueofKey;
  for (let i = 0; i < arr.length; i++) {
    valueofKey = arr[i][key];
    if (valueofKey.toLowerCase() === value.toLowerCase()) {
      obj = arr[i];
      console.log(obj);
      break;
  }
}
}

searchByKey(fruits, "color", "Yellow");
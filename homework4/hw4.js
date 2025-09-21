//Task 1 -  წაშალეთ მასივის თითოეული ელემენტის ბოლო სიმბოლო მაგ: 
// ["one","two","three"] => ["on","tw","thre"]

function removeLastChar(arr){
    return arr.map(el => el.slice(0, -1));
}

console.log(removeLastChar(["one","two","three"]));

//task 2
function sumTwoSmallest(arr) {
  return arr.sort((a, b) => a - b).slice(0, 2).reduce((a, b) => a + b, 0);
}
console.log(sumTwoSmallest([18, 7, 123, 12, 98]));

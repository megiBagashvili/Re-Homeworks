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


//task 3
function groupByCurrency(arr){
  return arr.reduce((prevVal, currentVal) => {
    if(!prevVal[currentVal.currency]){
      prevVal[currentVal.currency] = [];
      prevVal[currentVal.currency].push({amount: currentVal.amount});
    }else{
      prevVal[currentVal.currency].push({amount: currentVal.amount});
    }
    return prevVal;
  }, {})
}

console.log(groupByCurrency([
  { amount: 10, currency: "USD" },
  { amount: 20, currency: "EUR" },
  { amount: 5,  currency: "USD" },
  { amount: 50, currency: "EUR" }
]));


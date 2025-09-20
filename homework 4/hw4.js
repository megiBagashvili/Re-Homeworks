//Task 1 -  წაშალეთ მასივის თითოეული ელემენტის ბოლო სიმბოლო მაგ: 
// ["one","two","three"] => ["on","tw","thre"]

function removeLastChar(arr){
    return arr.map(el => el.slice(0, -1));
}

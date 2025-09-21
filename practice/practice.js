const names = [7,2,3,4,5,6];

let res = names.reduce((prevVal, currentVal) => {
    console.log(prevVal, "prevVal");
    console.log(currentVal, "currentVal");
    return prevVal + currentVal;
}, 0);
console.log(res, "res");
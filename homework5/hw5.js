//task 1
function deleteSpecifiedParam(obj, prop){
    delete obj[prop];
    return obj;
}

let obj = {category: 'Cake', icing: 'Chocolate', serving: 8};
console.log(deleteSpecifiedParam(obj, 'icing'));
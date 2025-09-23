//task 1
function deleteSpecifiedParam(obj, prop) {
    delete obj[prop];
    return obj;
}

let obj = { category: 'Cake', icing: 'Chocolate', serving: 8 };
console.log(deleteSpecifiedParam(obj, 'icing'));

//task 2
function declareLeaderBoard(arr) {
    let newArr = arr.sort((a, b) => b.score - a.score)
    for (let stud in newArr) {
        newArr[stud].rank = +stud + 1;
    }
    return newArr;
}

let students = [
    { name: "Ana", score: 50 },
    { name: "Nika", score: 80 },
    { name: "Luka", score: 70 }
]
console.log(declareLeaderBoard(students));
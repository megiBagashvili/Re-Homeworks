//task 1
function deleteSpecifiedParam(obj, prop) {
    delete obj[prop];
    return obj;
}

let obj = { category: 'Cake', icing: 'Chocolate', serving: 8 };
console.log(deleteSpecifiedParam(obj, 'serving'));

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

//task 3
function selectLongestNameObj(arr) {
    return arr.reduce((longest, current) => {
        if (current.title.length > longest.title.length) {
            return current;
        }
        return longest;
    })
}

let movies = [
    { title: "Up", year: 2009 }, { title: "The Lord of the Rings", year: 2001 }, { title: "The Assassination of Jesse James by the Coward Robert Ford", year: 2010 }
]

console.log(selectLongestNameObj(movies));

//task 4
function countAveragesForEachDep(arr) {
    let firstObject = arr.reduce((prev, curr) => {
        if (!prev[curr.dept]) {
            prev[curr.dept] = { total: curr.age, count: 1 }
        } else {
            prev[curr.dept].total += curr.age;
            prev[curr.dept].count += 1;
        }
        return prev;
    }, {})
    return Object.keys(firstObject).reduce((acc, dept) => {
        acc[dept] = firstObject[dept].total / firstObject[dept].count;
        return acc;
    }, {});
}
console.log(countAveragesForEachDep([
    { name: "John", age: 25, dept: "IT" },
    { name: "Jane", age: 30, dept: "HR" },
    { name: "Jim", age: 35, dept: "IT" },
    { name: "Jake", age: 40, dept: "Finance" },
    { name: "Jill", age: 45, dept: "HR" }
]));

//task 5
function countWotds(arr) {
    let count = 0;
    let newArr = arr.reduce((acc, curr) => {
        acc.push(curr.comment);
        return acc;
    }, [])
    for (let i = 0; i < newArr.length; i++) {
        count += newArr[i].trim().split(' ').filter(Boolean).length;
    }
    return count;
}
console.log(countWotds([
    { id:1, comment:"Hello world" }, 
  { id:2, comment:"This is great!" },
  { id:3, comment:"" }
]));
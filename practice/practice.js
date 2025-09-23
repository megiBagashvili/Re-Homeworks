const names = [7,2,3,4,5,6];

let res = names.reduce((prevVal, currentVal) => {
    console.log(prevVal, "prevVal");
    console.log(currentVal, "currentVal");
    return prevVal + currentVal;
}, 0);
console.log(res, "res");

//lecture 5
function totalOver400(items) {
    return items.filter(item => item.price > 400).reduce((sum, item) => sum + item.price, 0);
}

const users = [
    {id: 1, name: "Nika", age: 12},
    {id: 2, name: "Mari", age: 24},
    {id: 3, name: "Saba", age: 24},
    {id: 4, name: "Tako", age: 35},
]


function groupByAge(arr) {
  return arr.reduce((prevVal, currentVal) => {
    if (!prevVal[currentVal.age]) {
      prevVal[currentVal.age] = [];
      prevVal[currentVal.age].push({ name: currentVal.name });
    } else {
      prevVal[currentVal.age].push({ name: currentVal.name });
    }
    return prevVal;
  }, {})
}

console.log(groupByAge(users));



const students = [
    { name: "Ana", scores: [80, 90, 100] },
    { name: "Nika", scores: [70, 60, 75] },
    { name: "Luka", scores: [95, 85, 90] }
];

// function topStudent(students) {
//     const averages = students.map(student => {
//         const sum = student.scores.reduce((a, b) => a + b, 0);
//         const average = sum / student.scores.length;
//         return { name: student.name, average: average };
//     });
//     return averages.reduce((best, current) => {
//         if (current.average > best.average) {
//             return current;
//         } else {
//             return best;
//         }
//     });
// }

// console.log(topStudent(students));

function topStudent(students) {
    let bestStudent = null;
    let highestAverage = 0;

    for (let i = 0; i < students.length; i++) {
        let sum = students[i].scores.reduce((total, score) => total + score, 0);
        let average = sum / students[i].scores.length;
        if (average > highestAverage) {
            highestAverage = average;
            bestStudent = { name: students[i].name, average: average };
        }
    }

    return bestStudent;
}


const sales = [
  { item: "Laptop", category: "Electronics", price: 1200 },
  { item: "Phone",  category: "Electronics", price: 800 },
  { item: "Shirt",  category: "Clothes",     price: 40  },
  { item: "Pants",  category: "Clothes",     price: 50  }
];

function groupByCategoryAndSumPrices(sales) {
    return sales.reduce((acc, sale) => {
        if (!acc[sale.category]) {
            acc[sale.category] = 0;
        }
        acc[sale.category] += sale.price;
        return acc;
    }, {});
}

console.log(groupByCategoryAndSumPrices(sales));

// task 1 - დაწერეთ ფუნცქცია რომელიც მიიღებს 
// მასივს არგუმენტად და დააბრუნებს ამ მასივის 
// საშუალო არითმეტიკულს.


function findAverage(array) {
    let sum = 0;
    let divisor = array.length;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum / array.length;
}

console.log(findAverage([1, 2, -3, 4, -5, 221]));

//task 2 - დაწერეთ ფუნცქია რომელიც პარამეტრად 
// მიიღებს რიცხვს და დააბრუნებს ამ რიცხვის 
// შებრუნებულ მასივს თითოეული წევრით. 
// მაგ: 35231 → [1,3,2,5,3]. 0 => [0]

function reverseNumberIntoArray(number) {
    let sNum = number.toString();
    let res = sNum.split('').reverse();
    for (let i = 0; i < res.length; i++) {
        res[i] = Number(res[i]);
    }
    return res;
}

console.log(reverseNumberIntoArray(98765));

// task 3 - დაწერეთ ფუნქცია რომელიც მიიღებს 
// 2 მასივს არგუმენტად და დააბრუნებს მასივის 
// მხოლოდ იმ წევრებს რომელსაც მეორე მასივი 
// არ შეიცავს მაგ: a = [1, 2] და b = [1] დააბრუნეთ [2]. 
// a = [1, 2, 2, 2, 3] და b = [2] დააბრუნეთ [1, 3].
function discardSames(arr1, arr2) {
    let res = [];
    for (let i = 0; i < arr1.length; i++) {
        if (!arr2.includes(arr1[i])) {
            res.push(arr1[i]);
        }
    }
    return res;
}

console.log(discardSames([1,2,3,4], [2,4]));

// task 4 - დაწერეთ ფუნცქცია რომელსაც გადმოეცემა 
// მასივი და იპოვე მასივში მეორე ყველაზე დიდი რიცხვი. 
// მაგ: [10, 40, 20, 5, 30] => 30
function findSecondBiggest(array) {
    let newArr = array.sort((a, b) => a - b);
    return newArr[newArr.length - 2];
}
console.log(findSecondBiggest([10, 40, 20, 5, 30]));

// task 5 - დაწერეთ ფუნცქია რომელიც მიიღებს 
// სტირნგების მასივს და უნდა დააბრუნოტ მხოლოდ 
// იმ სიტყვების მასივი რომლებიც არის პალინდორმი: 
// მაგ: ["mom", "car", "level", "dog"] => ["mom", "level"]

function getPalindromes(array) {
    let onlyPalindromes = [];
    for (let i = 0; i < array.length; i++) {
        let str = array[i].toString();
        if (str.split('').reverse().join('') === str) {
            onlyPalindromes.push(array[i]);
        }
    }
    return onlyPalindromes;
}

console.log(getPalindromes(["aba", "cat", "level", "hello", "12321"]));


// task 6 - დაწერეთ ფუნცქია რომელიც მიიღებს 
// რიცხვების მასივს და დააბრუნებთ რომელია 
// ყველაზე ხშირად გამეორებადი რიცხვი 
// მაგ: [4, 5, 6, 5, 4, 5] => 5
function mostRepeatedNum(array){
    let num = array[0];
    let maxCount = 1;
    for(let i = 0; i < array.length; i++){
        let count = 0;
        for(let j = 0; j < array.length; j++){
            if(array[i] === array[j]){
                count++;
            }
        }
        if(count > maxCount){
            maxCount = count;
            num = array[i];
        }
    }
    return num;
}
console.log(mostRepeatedNum([4, 5, 6, 5, 4, 5, 7, 8, 5, 4, 4, 4]));


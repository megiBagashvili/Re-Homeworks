const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const arr2 = arr.filter((el) => {
    if(el % 3 === 0){
        return el;
    }
});
console.log(arr2);


const names = ["sarah", "maggie", "jack", "nick", "nellie", "james", "nathan"];
const namesWithCapitalleter = names.map(name => name.charAt(0).toUpperCase() + name.slice(1));
console.log(namesWithCapitalleter);
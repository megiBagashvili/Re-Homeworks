//task 1
console.log("1");
setTimeout(() => console.log("2"), 100);
setTimeout(() => console.log("3"), 0);
Promise.resolve().then(() => console.log("4"));
console.log("5");
//1,5,4,3,2
/** 
 * ჯერ სრულდება synchronous ბრძანებები, ამიტომ 1 და 5
 * პირველები დაილოგება იმ თანმიმდევრობით, როგორც კოდშ წერია.
 * Promise.then(...) ქოლბექები წარმოადგენენ microtask-ს.
 * microtask-ები ეშვებიან სინქრონული კოდის დასრულების შემდეგ,
 * და ვიდრე ტაიმერების ქოლბექები (macrotask) დაიწყება,
 * ამიტომ 1-სა და 5-ის შემდეგ დაიბეჭდება 4.
 * setTimeout(..., 0) და setTimeout(..., 100) ქოლბექები წარმოადგენენ macrotask-ს,
 * რომლებიც ეშვებიან microtask-ების დასრულების შემდეგ. 
 * setTimeout(..., 0) უფრო ადრე სრულდება ვიდრე setTimeout(..., 100),
 * ამიტომ 3 დაიბეჭდება 4-ის შემდეგ, ხოლო 2 ყველაზე ბოლოს. 
 */


//task 2
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => {
  console.log("3");
  setTimeout(() => console.log("4"), 0);
});
console.log("5");
//1,5,3,2,4
/** 
 * აქაც ჯერ synchronous ნაწილი შესრულდება - 1 და 5. 
 * setTimeout(() => console.log("2"), 0) → macrotask: პირველი ტაიმერი, რომელიც ჯერ არ ეშვება.
 * Promise.resolve().then(...) → microtask. ქოლბექი  სინქრონული კოდის დასრულების შემდეგ გაეშვება.
 * 1-სა და 5ის შემდეგ:
 * Microtask queue: Promise callback.
 * Macrotask queue: პირველი ტაიმერი (console.log("2")).
 * microtask queue უფრო მაღალი პრიორიტეტია ვიდრე macrotask queue, ამიტომ 5-ის შემდეგ დაიბეჭდება 3.
 * promise callback ქმნის მეორე ტაიმერს, რომელიც კიდევ ერთ macrotask-ს წარმოადგენს.
 * microtask queue ამ მომენტისთვის ცარიელია, ამიტომ იწყება macrotask queue-ს შესრულება FIFO პრინციპით.
 * პირველი ტაიმერი დაბეჭდავს 2-ს.
 * მეორე ტაიმერი დაბეჭდავს 4-ს.
 */


//task 3
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  console.log("Start");
  await sleep(1000);
  console.log("1 second later");
})();
//Start
// ... 
// 1 second later

//task 4
function stopWhenMatched(target) {
  if (target < 1 || target > 20) {
    throw new Error("Target outofbounds");
  }

  const interval = setInterval(() => {
    const randomNum = Math.floor(Math.random() * 20) + 1;
    console.log(randomNum);

    if (randomNum === target) {
      console.log("Matched");
      clearInterval(interval);
    }
  }, 1000);
}

stopWhenMatched(13);



//task 5
function countDownToZero(start, interval) {
  if (start < 0) {
    throw new Error("zero or more required");
  }
  let current = start;
  const timer = setInterval(() => {
    console.log(current);
    if (current === 0) {
      clearInterval(timer);
    }
    current--;
  }, interval);
}

countDownToZero(16, 2000);

let money = 1500;
let income = 500;
let addExpenses = 'Интернет, такси, коммуналка';
let deposit = true;
let mission = 10000;
let period = 8;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен '+ period + ' месяцев');
console.log('Цель заработать '+ mission + ' долларов');

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = (money + income) / 30;
console.log(budgetDay);
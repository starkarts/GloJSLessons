let money = 50000;
let income = 10000;
let addExpenses = 'Интернет, такси, коммуналка';
let deposit = true;
let mission = 200000;
let period = 5;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен '+ period + ' месяцев');
console.log('Цель заработать '+ mission + ' рублей');

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = (money + income) / 30;
console.log(budgetDay);

// lesson_3

money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательую статью расходов?'),
    amount1 = +prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите обязательую статью расходов?'),
    amount2 = +prompt('Во сколько это обойдется?');

let budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц: ' + budgetMonth);

console.log('Цель будет достигнута за ' + Math.ceil( mission / budgetMonth) + ' месяцев');

budgetDay = (budgetMonth) / 30;
console.log('Бюджет на день: ' + budgetDay);

if (budgetDay < 0) {
  console.log('Что-то пошло не так');
} else if (budgetDay > 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay <= 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay < 600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
  console.log('Что-то пошло не так');
}

